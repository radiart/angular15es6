export default class Article {
	constructor( AppConstants, $http, $q ) {
		'ngInject';

		this._AppConstants = AppConstants;
		this._$http = $http;
		this._$q = $q;
	}

	/* Config object spec:
	 	{
	 		type: String [REQUIRED] - Accepts "all", "feed"
	 		filters: Object that serves as a key => value of URL params (i.e.
	 		{author: "ericsimons"} )
		}
	*/
	query( config ){
		// create the $http object from this request
		let request = {
			url: this._AppConstants.api + '/articles' + (( config.type === 'feed' ) ? '/feed' : ''),
			method: 'GET',
			params: config.filters ? config.filters : null
		};
		return this._$http(request).then( (res) => res.data );
	}


	get( slug ) {
		let deferred = this._$q.defer();

		if( !slug.replace(" ", "") ) {
			deferred.reject('Article slug is empty');
			return deferred.promise;
		}

		this._$http({
			url: this._AppConstants.api + '/articles/' +slug,
			method: 'GET'
		}).then(
			(res) => deferred.resolve(res.data.article),
			(err) => deferred.reject(err)
		);

		return deferred.promise;
	}

	save( article ){
		let request = {};

		// If there's a slug, perform an update via PUT w/ article's slug
		if( article.slug ) {
			request.url = `${this._AppConstants.api}/articles/${article.slug}`;
			request.method = 'PUT';

			// Delete the slug from the article to ensure the server updates the slug,
			// which happens if the title of the article changed.
			delete article.slug;

		// Otherwise, this is a new article POST request
		} else {
			request.url = `${this._AppConstants.api}/articles`;
			request.method = 'POST';
		}

		// Set the article data in the data attribute of our request
		request.data = { article: article };

		return this._$http(request)
			.then( (res) => res.data.article );
	}

	// Delete an article
	destroy( slug ) {
		return this._$http({
			url: this._AppConstants.api + '/articles/' +slug,
			method: 'DELETE'
		})
	}

	// Favorite an article
	favorite( slug ) {
		return this._$http({
			url: this._AppConstants.api + '/articles/' +slug + '/favorite',
			method: 'POST'
		})
	}

	// Unfavorite an article
	unfavorite( slug ) {
		return this._$http({
			url: this._AppConstants.api + '/articles/' +slug + '/favorite',
			method: 'DELETE'
		})
	}
}