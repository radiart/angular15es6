import marked from 'marked';

class ArticleCtrl {

  constructor( User, Comment, article, $sce, $rootScope ) {
    'ngInject';

    this._Comment = Comment;

    this.currentUser = User.current;

    this.article = article;

    // Update the title of this page
    $rootScope.setPageTitle( this.article.title );

    this.article.body = $sce.trustAsHtml( marked( this.article.body, {
      sanitize: true
    } ) );

    // Initialize blank comment form
    this.resetCommentForm();
  }

  resetCommentForm(){
    this.commentForm = {
        isSubmiting: false,
        body: '',
        errors: []
    }
  }

  // Add a comment to an article
  addComment() {
    this.commentForm.isSubmiting = true;
    this._Comment.add( this.article.slig, this.commentForm.body ).then(
        (comment) => {
          console.log(comment);
          this.resetCommentForm();
        },
        (err) => {
          this.commentForm.isSubmiting = false;
          this.commentForm.errors = err.data.errors;
        }
    )
  }

}


export default ArticleCtrl;
