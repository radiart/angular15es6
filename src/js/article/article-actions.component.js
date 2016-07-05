class ArticleActionsCtrl {

	constructor( User, Article, $state ) {
		'ngInject';

		this._Article = Article;
		this._$state = $state;

		// The user can only edit/delete this comment if they are the author
		if( User.current) {
			this.canModify = ( User.current.username === this.article.author.username );
		} else {
			this.canModify = false;
		}
	}

	deleteArticle(){
		this.isDeleting = true;
		this._Article.destroy( this.article.slug ).then(
			(success) => this._$state.go('app.home'),
			(err) => this._$state.go('app.home')
		)
	}
}

let ArticleActions  = {
	bindings: {
		article: '='
	},
	controller: ArticleActionsCtrl,
	templateUrl: 'article/article-actions.html'
};

export default ArticleActions;