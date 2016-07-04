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

import ArticleMeta from './article-helpers/article-meta.component';
componentsModule.component('articleMeta', ArticleMeta);


export default componentsModule;
