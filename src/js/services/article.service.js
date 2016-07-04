export default class Article {
	constructor( AppConstants, $http ) {
		'ngInject';

		this._AppConstants = AppConstants;
		this._$http = $http;
	}

	save( article ){
		let request = {
			url: `${this._AppConstants.api}/articles`,
			method: 'POST',
			data: { article: article }
		}

		return this._$http(request)
			.then( (res) => res.data.article );
	}
}