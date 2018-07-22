/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
define([
    'underscore',
    'backbone',
    'jquery',
    'core',
    'semver'
],
        function (
                _,
                Backbone,
                $,
                Core,
                SemVer
                ) {

            //all following paths relative to require-config baseUrl ie - 'js'
            var MAIN_CONFIG_PATH = '../config.json',
                    MODULE_CONFIG_PATH = function (moduleName) {
                        return 'modules/' + moduleName + '/config.json';
                    },
                    MODULE_MAIN_PATH = function (moduleName) {
                        return 'modules/' + moduleName + '/' + moduleName;
                    };

            //private functions 

            function _loadAppConfig() {
                var promise = $.Deferred(function (defer) {
                    require(['json!' + MAIN_CONFIG_PATH], function (AppConfig) {
                        defer.resolve(AppConfig);
                    });
                }).promise();

                return promise;
            }

            function _loadMasterModuleConfigs(appConfig) {
                //read modules/[module-name]/config.json files 
                //resolve dependencies

                var promise = $.Deferred(function (defer) {
                    if (!appConfig) {
                        Core.ErrorHandler.handle({
                            type: Core.ErrorHandler.TYPES.app_config,
                            desc: 'Invalid App Config'
                        });
                        defer.reject();
                    }
                    if (_.isEmpty(appConfig.modules)) {
                        //modules array is empty
                        //handle this error
                        Core.ErrorHandler.handle({
                            type: Core.ErrorHandler.TYPES.app_config,
                            desc: 'Empty module list'
                        });
                        defer.reject();
                    }
                    var masters = _.clone(appConfig.modules) || {},
                            masterModuleConfigs = [];

                    _.each(masters, function (version, masterModuleName) {
                        var masterConfigPath = MODULE_CONFIG_PATH(masterModuleName);
                        require(['json!' + masterConfigPath], function (masterModuleConfig) {
                            //masterModule must be set for masterModules.config
                            if (!masterModuleConfig.masterModule) {
                                Core.ErrorHandler.handle({
                                    type: Core.ErrorHandler.TYPES.module_config,
                                    desc: 'masterModule must be set to ture for module: ' + masterModuleName
                                });
                                defer.reject();
                                return;
                            }

                            masterModuleConfig._loaded_ = true;
                            masterModuleConfigs.push(masterModuleConfig);

                            if (Object.keys(masters).length === masterModuleConfigs.length) {
                                //every masterModule's config.json files are loaded
                                //time to resolve the promise
                                defer.resolve(masterModuleConfigs);
                            }
                        });
                    });
                });

                return promise;
            }
            
            function defineModules(configs){
                var $defer = new $.Deferred(),
                        modules = [];
                function defineModule(config){
                    if(!config){
                        $defer.resolve(modules);
                        return;
                    }
                    
                    var modulepath = MODULE_MAIN_PATH(config.name);
                    require([modulepath],function(Module){
                        _.extend(Module.prototype, config);
                        var module = new Module();
                        module.router.prepend(module.name);
                        define(module.name,module);
                        module.trigger('load');
                        modules.push(module);
                        //load next config
                        var index = _.indexOf(configs,config),
                            next = configs[++index];
                        
                        defineModule(next);
                    },function(e){
                        $defer.reject(e);
                    });
                }
                
                var firstConfig = _.first(configs);
                defineModule(firstConfig);
                return $defer;
            }

            function _load(configs) {
                var $defer = new $.Deferred();
                _slaves.cache = [];
                function _slaves(config) {

                    var cache = _slaves.cache,
                            deps = config.deps;

                    if (_.isEmpty(deps)) {
                        //leaf module
                        if (_.isEmpty(_.where(cache, {name: config.name}))) {
                            cache.push(config);
                        }
                        return;
                    }

                    _.each(deps, function (version, name) {

                        var configpath = MODULE_CONFIG_PATH(name);
                        require(['json!' + configpath], function (config) {
                            _slaves(config);
                            if (_.isEmpty(_.where(cache, {name: name}))) {
                                cache.push(config);
                            }
                        });
                    });

                }

                _.each(configs, function (config) {
                   _slaves(config);
                   if (_.isEmpty(_.where(_slaves.cache, {name: config.name}))) {
                        _slaves.cache.push(config);
                   }
                });
                
                //TODO : Find a better solution of following delay. All require of configs are async. 
                // When less dependant module is still not loaded, 
                // there is theorical possibility to load more dependant modules.
                // Which is not correct and can be considered as a bug.
                // Need to correct this in near future
                _.delay(function(){
                    $defer.resolve(_.clone(_slaves.cache));
                },300); 
                return $defer;
            }

            function loader() {
            }

            loader.prototype.load = function () {
                var me = this;
                _loadAppConfig().then(function (AppConfig) {
                    //todo - AppConfig may require to save in App.instance
                    _loadMasterModuleConfigs(AppConfig).then(function (masterConfigs) {
                        //todo : semver test for moduleConfigs.version
                        _load(masterConfigs).then(function(configs){
                            //sort by least dependants
                            configs = _.sortBy(configs,function(config){
                                var deps = _.toArray(config.deps);
                                return deps.length;
                            });
                            defineModules(configs).done(function(modules){
                                
                                //TODO : navigator is also a module but a system module that does not reside inside 
                                //'modules' directory. We can think of moving navigator in 'modules' directory
                                //and load as other module gets loaded.
                                //As of now, load navigator first and then trigger first module in navigator
                                
                                var navigatorMainPath = 'navigator/navigator',
                                        navigatorConfigPath = MODULE_CONFIG_PATH('../navigator');

                                require(['json!'+navigatorConfigPath], function (navConf) {
                                    require([navigatorMainPath], function (NavigatorModule) {
                                        
                                        NavigatorModule = _.extend(NavigatorModule,navConf);
                                        var navigator = new NavigatorModule({
                                            appconfig: AppConfig,
                                            modules: modules
                                        });
                                        me.listenTo(navigator, 'select', function (module) {
                                            me.trigger('select', module);
                                        });
                                        navigator.render();
                                    });
                                });

                            }).fail(function(e){
                                console.log(e);
                                //TODO : error handling
                            });
                        });
                    });
                });
            };
            _.extend(loader.prototype, Backbone.Events);
            return loader;
        });