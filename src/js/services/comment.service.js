export default class Comment {

	constructor( AppConstants, $http ) {
		'ngInject';

		this._AppConstants = AppConstants;
		this._$http = $http;
	}

	// Get all comments
	getAll( slug ) {
		return this._$http({
			url: `${ this._AppConstants.api}/articles/${slug}/comments`,
			method: 'GET'
		}).then( (res)=> res.data.comments );
	}

	// Add a comment to an article
	add( slug, payload ) {
		return this._$http({
			url: `${ this._AppConstants.api}/articles/${slug}/comments`,
			method: 'POST',
			data: { comment: { body: payload } }
		}).then( (res)=> res.data.comment );
	}

	destroy( slug, commentId ){
		return this._$http({
			url: `${ this._AppConstants.api}/articles/${slug}/comments/${commentId}`,
			method: 'DELETE'
		});
	}

}