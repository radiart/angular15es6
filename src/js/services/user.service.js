export default class User {

	constructor( AppConstans, $http ){
		'ngInject';

		this._AppConstans = AppConstans;
		this._$http = $http;


		this.current = null;
	}

	attemptAuth( type, credentials ) {
		let route = ( type === 'login' ) ?  '/login' : '';
		return this._$http({
			url: this._AppConstans.api + 'users' + route,
			method: 'POST',
			data: {
				user: credentials
			}
		}).then(
			(res) => {
				this.current = res.data.user;
				return res;
			}
		)
	}
}