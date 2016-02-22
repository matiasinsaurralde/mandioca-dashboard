(function(){

  angular
    .module('app')
    .controller('ProfileController', [
			'$mdDialog', '$http',
      ProfileController
    ]);

  function ProfileController($mdDialog,$http) {
    var vm = this;
		vm.add = add;

    function add() {

			$http.post( '/apis', { api: { slug: vm.api.slug, name: vm.api.name, endpoint_url: vm.api.endpoint } } );

			console.log('submit', vm.api.name);
			showAlert();
    }

    function showAlert() {
        alert = $mdDialog.alert({
            title: 'Done!',
            content: "Action success.",
            ok: 'Close'
        });
        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
    }

  }

})();
