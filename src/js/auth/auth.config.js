function AuthConfig( $stateProvider, $httpProvider ) {
	'ngInject';

	// Define the routes

	$stateProvider
		.state('app.login', {
			url: '/login',
			controller: 'AuthCtrl as $ctrl',
			templateUrl: 'auth/auth.html',
			title: 'Sign in',
			resolve: {
				auth: function( User) {
					User.ensureAuthIs(false);
				}
			}
		})
		.state('app.register', {
			url: '/register',
			controller: 'AuthCtrl as $ctrl',
			templateUrl: 'auth/auth.html',
			resolve: {
				auth: function( User) {
					User.ensureAuthIs(false);
				}
			}
		})
};

export default AuthConfig;