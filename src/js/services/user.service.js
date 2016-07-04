export default class User {

	constructor( JWT, AppConstants, $http, $state, $q ){
		'ngInject';

		this._JWT = JWT;
		this._AppConstants = AppConstants;
		this._$http = $http;
		this._state = $state;
		this._$q = $q;

		this.current = null;
	}

	attemptAuth( type, credentials ) {
		let route = ( type === 'login' ) ?  '/login' : '';
		return this._$http({
			url: this._AppConstants.api + 'users' + route,
			method: 'POST',
			data: {
				user: credentials
			}
		}).then(
			(res) => {
				this._JWT.save( res.data.user.token );
				this.current = res.data.user;
				return res;
			}
		)
	}

	logout(){
		this.current = null;
		this._JWT.destroy();
		this._$state.go( this._$state.$current, null, { reload: true })
	}

	verifyAuth() {
		let deferred = this._$q.defer();

		// chech for JWT Token
		if( !this._JWT.get() ) {
			deferred.resolve( false );
			return deferred.promise;
		}

		if( this.current ) {
			deferred.resolve( true );
		} else {
			this._$http({
				url: this._AppConstants.api + '/user',
				method: 'GET'
			}).then(
				(res) => {
					this.current = res.data.user;
					deferred.resolve( true );
				},
				(err) => {
					this._JWT.destroy();
					deferred.resolve(false);
				}
			)
		}

		return deferred.promise;

	}
}