class HomeCtrl {

  constructor( User, AppConstants, Tag, $scope ) {
    'ngInject';

    this.appName = AppConstants.appName;

    this._Tag = Tag;

    this._$scope = $scope;

    // Get list of all Tags
    Tag.getAll().then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags;
        }
    )

    // Set current list to either feed of all, depeneding on auth status
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };
  }

  changeList( newList ){
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default HomeCtrl;
