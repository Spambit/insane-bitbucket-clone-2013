"use stricts";define("template",["text","core/src/errorhandler"],function(e,t){return{normalize:function(e,t){var n=/{([\s\S]+?)}/,r=e.match(n),i=r?r[1]:null,s="";return i&&i.trim()!==""&&(s="modules/"+i+"/src/templates/",e=e.replace(n,"")),s+t(e)},load:function(n,r,i,s){function o(e){var n=/<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,r=new RegExp(n);r.test(e)?i&&i(e):require.onError({type:t.TYPES.require,origin:{desc:"Bad template"}})}o.error=function(e){i&&i.error&&i.error({type:t.TYPES.require,origin:e})},e.load(n,r,o,s)},write:e.write}});