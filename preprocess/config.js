/* jshint ignore:start */


angular.module('app.core')
// @if ENV == 'local'
    .constant('baseApiUrl', 'http://localhost:7203').constant('deployChannel', 'N/A');
// @endif
// @if ENV == 'dev'
.
constant('baseApiUrl', 'http://teamify-development.herokuapp.com').constant('deployChannel', 'dev');
// @endif
// @if ENV == 'staging'
.
constant('baseApiUrl', 'http://teamify-staging.herokuapp.com').constant('deployChannel', 'staging');
// @endif
// @if ENV == 'production'
.
constant('baseApiUrl', 'http://teamifyapp.herokuapp.com').constant('deployChannel', 'production');
// @endif


/* jshint ignore:end */