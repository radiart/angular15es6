class EditorCtrl {

	constructor( Article, $state ) {
		'ngInject';

		this._Article = Article;
		this._$state = $state;

		this.article = {
			title: '',
			description: '',
			body: '',
			tagList: []
		}
	}

	submit(){
		this.isSubmitting = true;

		this._Article.save( this.article )
			.then(
				(newArticle) => {
					this._$state.go('app.article', { slug: newArticle.slug });
				},
				(err) => {
					this.isSubmitting = false;
					this.errors = err.data.errors;
				}
			)
	}

	addTag() {
		if( !this.article.tagList.includes( this.tagField )) {
			this.article.tagList.push( this.tagField );
			this.tagField = '';
		}
	}

	removeTag( tagName ){
		this.article.tagList = this.article.tagList.filter( (slug) => slug != tagName );
	}
}


export default EditorCtrl;