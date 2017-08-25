import angular from 'angular'
import '../style/app.css'
import UserSearch from './user-search.js'
import TaggableTextArea from './taggable-text-area.directive'

let app = () => {
  return { template: require('./app.html') }
}

const TAG_USERS = 'app'

angular.module(TAG_USERS, [])
  .directive('app', app)
  .service('UserSearch', UserSearch)
  .directive('taggableTextArea', () => new TaggableTextArea)

export default TAG_USERS
