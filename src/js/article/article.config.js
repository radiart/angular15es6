function ArticleConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.article', {
    url: '/article/:slug',
    controller: 'ArticleCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'article/article.html',
    title: 'Article',
    resolve: {
      article: function( Article, $state, $stateParams ) {
        return Article.get( $stateParams.slug )
            .then(
                (article) => article,
                (err) => $state.go('app.home')
            );
      }
    }
  });

};

export default ArticleConfig;
