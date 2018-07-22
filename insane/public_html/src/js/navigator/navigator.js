'use strict';

define(['core',
    'underscore',
    'jquery',
    'template!navigator/src/templates/navbar.html'
],function(
        Core,
        _,
        $,
        NavbarTemplate)
        
{
    //create the navbar 
    //create the clientview
    //create login screen
    //listen for 'activate' event
    //activate the module
    
    var navigator = Core.Module.extend({
        initialize : function(options){
            //_.bindAll(this);
            options = options || {};
            this.appconfig = this.appconfig || options.appconfig;
            this.modules = this.modules || options.modules;
            if(_.isEmpty(this.modules)) {
                throw 'Error : Navigator should be provided with at-least one module.';
            }
        },
        routes : {
            //TODO : handle default route here or somewhere else but modules should not be allowed to 
            // handle it's default route.
            //'*notfound' : 'notFound'
        },
        render : function() {
            Core.Util.loadStyle(require.toUrl('navigator/src/styles/main.css'));
            
            this.renderNavbarView();
            
            var firstModuleNameInAppConfig = _.first(_.keys(this.appconfig.modules));
            this.select(firstModuleNameInAppConfig);
        },
        notFound : function(queryparams){
            console.log('default route');
        },
        createLoginView : function() {
            
        },
        renderNavbarView : function(){
            var compiledTemplate = NavbarTemplate.compile({
                masterModules : this.appconfig.modules, //TODO : Need to pass custom displayname of the modules
                brand : 'Insane' //TODO : need to take string from res file - need to think about branding
            });
            this.$el = $('.nav-bar-area');
            this.$el.html(compiledTemplate);
        },
        select: function (name) {
            var filtered = _.where(this.modules, {name: name}),
                    moduleToActivate = filtered ? filtered[0] : undefined;
            //TODO : We may ask native to provide saved-state url of this particular module
            //then we can pass the url as an option to module.trigger()
            //Need to find a solution for state saving of application
            if(moduleToActivate) {
                moduleToActivate.trigger('active');
                this.trigger('select',moduleToActivate);
            }
            
            var $navbarItem = $('#navbar-item-'+name,this.$el);
            $navbarItem.addClass('active');
        }
    });
    

    return navigator;
});