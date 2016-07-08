import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

// User
import UserService from './user.service';
servicesModule.service( 'User', UserService );

// Profile
import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

// Article
import ArticleService from './article.service';
servicesModule.service('Article', ArticleService);

// JWT
import JwtService from './jwt.service';
servicesModule.service('JWT', JwtService);

// Comment
import CommentService from './comment.service';
servicesModule.service('Comment', CommentService);

// Tag
import TagService from './tag.service';
servicesModule.service('Tag', TagService);

export default servicesModule;
