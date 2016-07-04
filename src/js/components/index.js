import angular from 'angular';
let componentsModule = angular.module('app.components', []);

// Directives
import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);


// Components
import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import ListErrors from './list-errors.component';
componentsModule.component('listErrors', ListErrors);


export default componentsModule;
