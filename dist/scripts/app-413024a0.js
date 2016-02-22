!function(){"use strict";angular.module("app",["ngMaterial"])}(),function(){"use strict";function t(t){var e=[{name:"Dashboard",icon:"dashboard",sref:".dashboard"}];return{loadAllItems:function(){return t.when(e)}}}angular.module("app").service("navService",["$q",t])}(),angular.module("app").directive("panelWidget",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{title:"@",template:"@",options:"@"},template:'<section layout-margin class="md-whiteframe-z1 panel-widget">  <md-toolbar md-theme="custom" class="md-hue-1 panel-widget-toolbar">    <div class="md-toolbar-tools">      <h3 class="panel-widget-tittle">{{title}}</h3>      <span flex></span>      <md-button ng-show="options" ng-click="$showOptions = !$showOptions" class="md-icon-button" aria-label="Show options">        <i class="material-icons">more_vert</i>      </md-button>    </div>  </md-toolbar>  <div ng-include="template"/></section>',compile:function(t,e,a){return function(t,e){a(t,function(t){e.append(t)})}}}}),function(){function t(){var t=this;t.ramChartData=[{key:"Memory",y:768660},{key:"Cache",y:367404},{key:"Swap",y:41924}],t.storageChartData=[{key:"System",y:126560},{key:"Other",y:224365}],t.chartOptions={chart:{type:"pieChart",height:130,donut:!0,x:function(t){return t.key},y:function(t){return t.y},valueFormat:d3.format(".0f"),color:["rgb(0, 150, 136)","#E75753","rgb(235, 235, 235)"],showLabels:!1,showLegend:!1,title:"83%",margin:{top:-10,left:-20,right:-20}}}}angular.module("app").controller("UsageController",[t])}(),function(){function t(t,e,a){function n(a){var n,i=a?r.countries.filter(o(a)):[];return n=e.defer(),t(function(){n.resolve(i)},1e3*Math.random(),!1),n.promise}function o(t){var e=angular.lowercase(t);return function(t){return 0===t.value.indexOf(e)}}var r=this;r.countries=a.loadAll(),r.selectedCountry=null,r.searchText=null,r.querySearch=n,r.disableCaching=!0}angular.module("app").controller("SearchController",["$timeout","$q","countriesService",t])}(),function(){function t(t,e,a,n,o,r,i){function l(){e("right").toggle()}function s(){var t=a.hide()||o.when(!0);t.then(function(){e("left").toggle()})}function d(t){u.title=t.name,u.toggleItemsList(),u.showSimpleToast(u.title)}function m(t){function e(t){var e=this;e.actions=[{name:"Share",icon:"share",url:"https://twitter.com/intent/tweet?text=Angular%20Material%20Dashboard%20https://github.com/flatlogic/angular-material-dashboard%20via%20@flatlogicinc"},{name:"Star",icon:"star",url:"https://github.com/flatlogic/angular-material-dashboard/stargazers"}],e.performAction=function(e){t.hide(e)}}a.show({parent:angular.element(document.getElementById("content")),templateUrl:"app/views/partials/bottomSheet.html",controller:["$mdBottomSheet",e],controllerAs:"vm",bindToController:!0,targetEvent:t}).then(function(t){t&&n.debug(t.name+" clicked!")})}function c(t){i.show(i.simple().content(t).hideDelay(2e3).position("bottom right"))}var u=this;u.menuItems=[],u.selectItem=d,u.toggleItemsList=s,u.showActions=m,u.title=r.current.data.title,u.showSimpleToast=c,u.toggleRightSidebar=l,t.loadAllItems().then(function(t){u.menuItems=[].concat(t)})}angular.module("app").controller("MainController",["navService","$mdSidenav","$mdBottomSheet","$log","$q","$state","$mdToast",t])}(),function(){function t(t,e){function a(){o.showProgress=!0,interval=e(function(){o.determinateValue+=1,o.determinateValue>100&&(o.determinateValue=10,o.showProgress=!1,n(),e.cancel(interval))},50,0,!0)}function n(){alert=t.alert({title:"Done!",content:"Action success.",ok:"Close"}),t.show(alert).finally(function(){alert=void 0})}var o=this;o.buttonEnabled=!1,o.showProgress=!1,o.reloadServer="Staging",o.performProgress=a,o.determinateValue=10}angular.module("app").controller("ControlPanelController",["$mdDialog","$interval",t])}(),angular.module("angularMaterialAdmin",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","ngMaterial","nvd3","app"]).config(["$stateProvider","$urlRouterProvider","$mdThemingProvider","$mdIconProvider",function(t,e,a,n){t.state("home",{url:"",templateUrl:"app/views/main.html",controller:"MainController",controllerAs:"vm","abstract":!0}).state("home.dashboard",{url:"/dashboard",templateUrl:"app/views/dashboard.html",data:{title:"Dashboard"}}),e.otherwise("/dashboard"),a.theme("default").primaryPalette("grey",{"default":"600"}).accentPalette("teal",{"default":"500"}).warnPalette("defaultPrimary"),a.theme("dark","default").primaryPalette("defaultPrimary").dark(),a.theme("grey","default").primaryPalette("grey"),a.theme("custom","default").primaryPalette("defaultPrimary",{"hue-1":"50"}),a.definePalette("defaultPrimary",{50:"#FFFFFF",100:"rgb(255, 198, 197)",200:"#E75753",300:"#E75753",400:"#E75753",500:"#E75753",600:"#E75753",700:"#E75753",800:"#E75753",900:"#E75753",A100:"#E75753",A200:"#E75753",A400:"#E75753",A700:"#E75753"}),n.icon("user","assets/images/user.svg",64)}]),angular.module("angularMaterialAdmin").run(["$templateCache",function(t){t.put("app/views/dashboard.html",'<div layout-gt-md="row"><panel-widget flex="" title="API Name" template="app/views/partials/controlPanel.html" class="fixed-height-widget"></panel-widget><panel-widget flex="" title="API Stats" template="app/views/partials/usage.html" class="fixed-height-widget"></panel-widget></div>'),t.put("app/views/main.html",'<md-sidenav md-is-locked-open="$mdMedia(\'gt-sm\')" md-component-id="left" class="md-whiteframe-z2 md-sidenav-left"><md-toolbar md-theme="custom" class="md-hue-1 md-whiteframe-z2"><md-button layout="row" layout-align="center center" class="md-toolbar-tools md-warn" href="#"><img class="img-circle" ng-src="assets/images/mandio.png"></md-button></md-toolbar><md-button ng-repeat-start="item in vm.menuItems" layout="column" layout-align="center center" flex="" class="capitalize" ng-click="vm.selectItem(item)" ui-sref-active="md-warn" ui-sref="{{item.sref}}"><div hide-sm="" hide-md="" class="md-tile-content"><i class="material-icons md-36">{{item.icon}}</i></div><div class="md-tile-content">{{item.name}}</div></md-button><md-divider ng-repeat-end=""></md-divider></md-sidenav><div layout="column" flex=""><md-toolbar layout="row" layout-align="end center"><md-button hide-sm="" class="toolbar-button" aria-label="Search"><i class="material-icons">search</i></md-button></md-toolbar><md-content flex="" class="md-padding page-content"><div ui-view=""></div></md-content></div>'),t.put("app/views/partials/controlPanel.html",'<md-content ng-controller="ControlPanelController as vm" class="md-padding"><div layout="row"><img class="img-circle" ng-src="assets/images/example-logo.png" src="assets/images/example-logo.png" style="margin: 10px;"><p class="ng-binding">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div><md-progress-linear class="widget-progress md-accent" md-mode="determinate" value="{{vm.determinateValue}}" ng-show="vm.showProgress"></md-progress-linear><br><md-button class="md-raised md-warn" ng-click="vm.performProgress()">Action 1</md-button><md-button class="md-raised md-warn" ng-click="vm.performProgress()">Action 2</md-button><md-button class="md-raised md-warn" ng-click="vm.performProgress()">Action 3</md-button></md-content>'),t.put("app/views/partials/usage.html",'<md-content ng-controller="UsageController as vm" class="md-padding" layout="row"><div flex=""><nvd3 options="vm.chartOptions" data="vm.ramChartData"></nvd3><h4 class="donut-chart-title">RAM</h4></div><div flex=""><nvd3 options="vm.chartOptions" data="vm.storageChartData"></nvd3><h4 class="donut-chart-title">Storage</h4></div></md-content>')}]);