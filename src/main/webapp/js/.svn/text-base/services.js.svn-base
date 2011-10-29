/* http://docs.angularjs.org/#!angular.service */

/**
 * App service which is responsible for the main configuration of the app.
 */

angular.service('documentService',function(resource,log){
    
  
    
    return {
        getStaticDocuments: function(){
            var res = resource('staticdocs.json',{},
            {
                retrive : {
                    method: 'GET'
                }
            });            
            return res.retrive();
        }
    }
},{
    $inject: ['$resource','$log']
    })

angular.service('proposalService',function (resource,log){
    
    return {
        getProposal : function(user,propId) {
            
            var res = resource('prop.json',{},
            {
                retrive : {
                    method: 'GET'
                }
            });
            
            return res.retrive();
            
        },
       
        getDraftProposals : function(user){
            var prop = [];
            
            for (var i = 0 ; i < 5 ; i++){
                var rnd = Math.floor(Math.random()*101);
                prop.push({
                    id : rnd*24 , 
                    firm : 'Polsoft_'+user+' '+rnd , 
                    date : '2011-07-05' , 
                    amount : 50*rnd ,                    
                    status :'szkic'
                });            
            }
            return prop;
        },
        
        getApplyProposals : function(user,startDate,endDate){
            var proposals = [];
            for (var i = 0 ; i < 5 ; i++){
                var rnd = Math.floor(Math.random()*101);
                proposals.push({
                    id : rnd*24 , 
                    firm : 'Polsoft_'+startDate+'_'+endDate+user+'_'+rnd , 
                    date : startDate , 
                    amount : 50*rnd , 
                    comment : 'Wnioske zlowny prawidlowo',
                    status :'nowy'
                });            
            }
            return proposals;
        },
        getCorrectionNeedProposals : function(user){
            return this.getApplyProposals(user,'2011-07-05','2011-07-05');
        }
    }
},{
    $inject: ['$resource','$log']
})

angular.service('dictionaryService',function (resource,log){
    
    var branches = resource('branches.json');
    
    var insurances = resource('insurances.json');
    
    return {
        getBranches : function(){
            return branches.get();
        },
        getInsurances : function()    {
            return insurances.get();
        }
        
        
    }

},{ $inject: ['$resource','$log']})


angular.service('productService',function (resource,log){
    
    
    var creditProducts = resource('creditproducts.json');
    
    var creditCardProducts = resource('creditcardproducts.json');
        
    var currentAccProducts =  resource('currentaccproducts.json');
    
    var productTerms = resource('productterms.json');
    
    var productCollaterals = resource('productcollateral.json');

    return {
        
        getCurrentAccProducts : function(){
            return currentAccProducts.get();
        },
        
        getCreditCardProducts : function(){
            return  creditCardProducts.get();
        },
        
        getCreditProducts : function(){
            return creditProducts.get();
        },
        
        getRequiredDocs : function(productId){
            var requiredDocs = resource('requireddocs.json').get();
            
            angular.forEach(requiredDocs.requireddocs,function(reqDoc){
                reqDoc.name  = reqDoc.name + " "+productId;
                reqDoc.desc  = reqDoc.desc + " "+productId;
            })
            return requiredDocs;
        } ,
        getProductTerms : function(productId){
            
            return productTerms.get();
        },
        getProductCollaterals : function(productId){
            
            return productCollaterals.get();
        }
    }
    
},{ $inject: ['$resource','$log']})

 