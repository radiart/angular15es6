class ArticleListCtrl {

	constructor( Article, $scope ) {
		'ngInject';

		this._Article = Article;

		this.setListTo( this.listConfig );

		$scope.$on('setListTo', ( ev, newList) => {
			this.setListTo( newList );
		});

		$scope.$on('setPageTo', ( ev, pageNumer) => {
			this.setPage( pageNumer );
		});
	}

	setListTo( newList ) {

		// Set the current list to an empty array
		this.list = [];

		// Set listConfig to the new list's config
		this.listConfig = newList;

		this.runQuery();
	}

	setPage( pageNumber ) {
		this.listConfig.currentPage = pageNumber;
		this.runQuery();
	}

	runQuery() {

		// Show the loading indicator
		this.loading = true;

		// Create an object for this query
		let queryConfig = {
			type: this.listConfig.type,
			filters: this.listConfig.filters || {}
		};

		// Set the limit filter from the component's attribute
		queryConfig.filters.limit = this.limit;

		// If there is no page ser, set page as 1
		if( !this.listConfig.currentPage ){
			this.listConfig.currentPage = 1;
		}

		// Add offset filter
		queryConfig.filters.offset = ( this.limit * ( this.listConfig.currentPage - 1));

		// Run Query
		this._Article
			.query( queryConfig )
			.then(
				(res) => {
					this.loading = false;

					// Update list ant total pages
					this.list = res.articles;

					this.listConfig.totalPages = Math.ceil( res.articlesCount / this.limit);
				}
			);
	}
}

let ArticleList = {
	bindings: {
		limit: '=',
		listConfig: '='
	},
	controller: ArticleListCtrl,
	templateUrl: 'components/article-helpers/article-list.html'
};

export default ArticleList;
