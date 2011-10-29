/* http://docs.angularjs.org/#!angular.widget */

angular.widget('@my:tabs', function(arrayProperty, compileElement) {
    var compiler = this;
    var sequence = 0;
    var template = $('.template', compileElement).hide();
    var templateFn = compiler.compile(template);
    compileElement.append("<ul></ul>");
    compileElement.tabs();
    return function(linkElement) {
        var scope = this;
        function createNewTab(i) {
            var newScope = scope.$new();
            newScope.$set('$e', scope[arrayProperty][i]);
            templateFn(newScope, function(newTab) {
                var newId = 'my-tabs_' + sequence++;
                linkElement.append(newTab.show().attr('id', newId));
                linkElement.tabs('add', '#'+newId, 'label');
            });
        } 
        scope.$watch(arrayProperty+'.length', function(length, oldLength) {
            var last = length - 1;
            var i;
            if (length > oldLength) {
                for (i = oldLength; i < length; i++) {
                    createNewTab(i);
                }
            } else if (length < oldLength) {
                for (i = length; i < oldLength; i++) {
                    linkElement.tabs('remove', last);
                }
            } else {
                for (i=0; i<length; i++) {
                    createNewTab(i);
                }
            }
        });
    };
});

angular.directive('sowka:maintabs', function() {
    return function(element) {
        angular.element('#acco').accordion();
        element.tabs('destroy').tabs({
            tabTemplate: '<li id="#{label}"><a href="#{href}"><span>#{label}</span></a></li>'
        });
    }
});

angular.directive('sowka:datepicker', function() {
    return function(element) {
        element.datepicker({
            changeYear : true,
            changeMonth : true,
            dateFormat : 'yy-mm-dd'
        });

    }
});

angular.widget('sowka:panel',function(compileElement) {

    var compiler = this;
    var desc = compileElement.attr('desc');    
    return function(element) {
    //  compileElement.append("<fieldset class='fs'> <legend> "+desc+"</legend> </fieldset>");
    }
});

angular.widget('@sowka:panel',function(desc,compileElement) {
    
    var compiler = this;
    var description = desc;
    return function(element) {

        element.before("<fieldset> <legend> "+description+"</legend> ");

        element.after('<fieldset> ');
    }
});

angular.directive('my:maketab', function(arrayProperty, compileElement) {
  
 
    compileElement.append("<ul></ul>");
    compileElement.tabs();   
    var seq = 5;
 
    return function(element) {
        var scope = this;   
        var uniqueId = arrayProperty+seq++;
       
    };
  
});

angular.directive('sowka:accord', function() {
    
    return function(element) {
        element.accordion({
            autoHeight: false,
            navigation: true,
            header : 'h3'
        });

    }
});

angular.directive('sowka:tabs', function() {
    
    return function(element) {
        element.tabs();
    }
});

angular.directive('sowka:tablesorter', function(compileElement) {
    
    return function(element) {
        element.tablesorter({
            widgets: ['zebra']
            }); 
        
    }
});

angular.directive('sowka:panel', function() {
    return function(element) {
        element.panel({
            collapseType:'slide-left',
            width:'300px'
        });
    }
});


angular.directive('sowka:datepicker', function() {
    return function(element) {
        element.datepicker({
            changeYear : true,
            changeMonth : true,            
            dateFormat : 'yy-mm-dd'
        });
    }
});

angular.directive('my:taby', function(arrayProperty, compileElement) {
    
   
    var seq = 5;
    // compileElement.tabs();
    return function(element) {
        var currentScope = this;
        var no = element.attr('ng:repeat-index');  
        var uniqueId = arrayProperty+seq++;
        currentScope[arrayProperty][no].id = uniqueId;
        element.attr("id",uniqueId);
        
        
       
        currentScope.$watch(arrayProperty+'.length', function(length, oldLength) {
            element.tabs('add', '#'+uniqueId, 'Osoba_'+uniqueId);
            
        });
         
    };
  
});