/* App Controllers */


function ProductCtrl(productService){
         
    var self = this;    
    self.productId = self.params.productId;
    self.requiredDocs = productService.getRequiredDocs(self.productId);
    self.productTerms = productService.getProductTerms(self.productId);
    self.productCollateral = productService.getProductCollaterals(self.productId);
      
}
ProductCtrl.$inject = ['productService'];


function ProposalDraftCtrl(proposalService){
    var self = this;
    self.draftProps = proposalService.getDraftProposals(self.login);
}

ProposalDraftCtrl.$inject = ['proposalService'];


function CorrectionNeedPropCtrl(proposalService){
    var self = this;
    self.correctionNeedProps = proposalService.getCorrectionNeedProposals(self.login);
}
CorrectionNeedPropCtrl.$inject = ['proposalService'];

function StaticDocsCtrl(documentService){
    
    var self = this;    
    self.staticDocs = documentService.getStaticDocuments();

}
StaticDocsCtrl.$inject = ['documentService'];
 
function ApplyPropCtrl(proposalService,$invalidWidgets){
    
    var self = this;
    self.invalidWidgets = $invalidWidgets;
    
    self.proposals = [];
    
    this.fetchApplyProposal = function(){
        
        self.proposals = proposalService.getApplyProposals(self.login,self.applyPropStartDate,self.applyPropEndDate);
    
    }
    
}
ApplyPropCtrl.$inject = ['proposalService','$invalidWidgets'];


    
function FileCtrl(proposalService,$invalidWidgets)
{
        
}
FileCtrl.$inject = ['proposalService','$invalidWidgets'];  

function MainCtrl($route,productService){
    
    this.login = 'wtk300';
    
    var self = this;
    
    $route.when('addProposal',{
        controller: ProposalCtrl ,
        template: 'prop.html'
    });
    
    $route.when('product/:productId',{
        controller: ProductCtrl ,
        template: 'productinfo.html'
    });
    
    $route.when('staticdocs',{
        controller: StaticDocsCtrl ,
        template: 'staticdocs.html'
    });
    
    $route.when('applyprop',{
        controller: ApplyPropCtrl ,
        template: 'applyprop.html'
    });
    
    $route.when('draftprop',{
        controller: ProposalDraftCtrl ,
        template: 'draftprop.html'
    });
    
    $route.when('forrevision',{
        controller: CorrectionNeedPropCtrl ,
        template: 'forrevision.html'
    });
    
    $route.when('editproposal/:propId',{
        controller: ProposalCtrl ,
        template: 'prop.html'
    });
    
    $route.when('sendfile/:propId',{
        controller: FileCtrl ,
        template: 'sendfile.html'
    });
    
    
    
    $route.onChange(function() {
        if (!$route.current){
            return ;
        }
        self.params = $route.current.params;
    });
    
    $route.parent(this);
    
    
    this.creditProducts = productService.getCreditProducts();
    
    this.creditCardProducts = productService.getCreditCardProducts();
    
    this.currentAccProducts = productService.getCurrentAccProducts();
}

MainCtrl.$inject = ['$route','productService'];

function ProposalCtrl($invalidWidgets,productService,proposalService,dictService){

    this.$invalidWidgets = $invalidWidgets;
    var self = this;
    
    self.propId = self.params.propId;
    
    self.$watch("propId",function(newValue,oldValue){
     
        //self.$set('test',angular.fromJson(proposalService.getProposal(self.login,self.propId)));
        
        //        var prop = angular.fromJson(proposalService.getProposal(self.login,newValue));
        //        self.$set('proposal',prop);
        //        
        
        //self.proposal = proposalService.getProposal(self.login,self.propId).$copy();
        //        self.proposal = {};
        //        
        //        angular.Object.copy(self.test,self.you);
        //        self.turbotest = 'new v '+newValue + ' old v '+oldValue;
        //        

        });
    
    this.getProposal = function(proposalId){
        if (proposalId != undefined){
            return proposalService.getProposal('aa','aa');
        }else{
            return {};
            
        }
        
        
    }
    
    self.proposal = self.getProposal(self.params.propId);
  
    this.persons = [
    {
        firstName: 'Stefan',
        lastName: 'Stefanowicz',
        age: 29
    },

    {
        firstName: 'Iwan',
        lastName: 'Iwanowicz',
        age: 32
    },

    {
        firstName: 'Ziut',
        lastName: 'Ziuto',
        age: 17
    }
    ];
    this.addPerson = function() {
        var rnd = Math.floor(Math.random()*101);
        this.msg = 'add dupa blada '+rnd;
        self.persons.push({
            firstName:'firstName'+rnd,
            lastName:'lastName'+rnd
        });
    
    }
    this.branches = dictService.getBranches();
    
    this.insurances = dictService.getInsurances();
    
    this.creditProducts = productService.getCreditProducts();
    
    this.creditCardProducts = productService.getCreditCardProducts();
  
    this.addSuretyAssets = function(){

        if (!angular.isArray(this.proposal.suretyAssets)){
            this.proposal.suretyAssets = [];
        }
        angular.Array.add(this.proposal.suretyAssets);
    }
  
    var fnListener  = function() {
       
        if (this.proposal.credit == undefined ){
            //this.proposal.credit = {reqInvestmentAmount : 0 , reqCurrentActAmount: 0};
            self.$set('proposal.credit.reqInvestmentAmount',0);
            self.$set('proposal.credit.reqCurrentActAmount',0);
            self.$set('proposal.credit.reqAmount',0);


        }
        //       if (this.proposal.credit.reqInvestmentAmount == undefined){
        //           this.proposal.credit.reqInvestmentAmount = 0;
        //       }
        //this.contracts = contractLoader.getContractsDate(this.fromEndContractDate,this.toEndContractDate);
        this.proposal.credit.reqAmount = parseInt(this.proposal.credit.reqCurrentActAmount) +  parseInt(this.proposal.credit.reqInvestmentAmount);            
    }

    this.$watch("proposal.credit.reqCurrentActAmount",fnListener);
    this.$watch("proposal.credit.reqInvestmentAmount",fnListener);
  
    this.delPerson = function() {
        self.persons.pop();
    }
    this.msg = 'Trzeba mnie zmienic';
  
    this.removePerson = function(p){
          
        angular.Array.remove(this.persons,p);
        angular.scope().msg = 'remove dupa blada';
    }

}

ProposalCtrl.$inject = ['$invalidWidgets','productService','proposalService','dictionaryService'];

ProposalCtrl.prototype = {

    save: function(){
        this.proposal.save = new Date();
    }
}



