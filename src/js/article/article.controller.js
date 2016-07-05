import marked from 'marked';

class ArticleCtrl {

  constructor( User, Comment, article, $sce, $rootScope ) {
    'ngInject';

    this._Comment = Comment;

    this.currentUser = User.current;

    this.article = article;

    // Update the title of this page
    $rootScope.setPageTitle( this.article.title );

    // Transform the markdown into HTML
    this.article.body = $sce.trustAsHtml( marked( this.article.body, { sanitize: true }));

    // Get comments for this article
    Comment.getAll( this.article.slug ).then(
      (comments) => this.comments = comments
    );

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
    this._Comment.add( this.article.slug, this.commentForm.body ).then(
        (comment) => {
          this.comments.unshift(comment);
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
