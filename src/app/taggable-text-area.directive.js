import data from './data.js'
import UserSearch from './user-search.js'

export default class TaggableTextArea {
  constructor() {
    this.restrict = 'E'
    this.template = require('./taggable-text-area.html')
    this.scope = {}
  }

  controller($scope) {
    /*  $scope.handleChange passes UserSearch what's in $scope.text, before
        the cursorPosition. It might be nicer to handle tagging users
        with the cursor in the middle of the username/name as well.  */
    $scope.handleChange = function (cursorPosition) {
      const stringBeforeCursor = $scope.text.substring(0, cursorPosition)
      const searchResults = UserSearch(stringBeforeCursor)

      $scope.matches = searchResults ? searchResults.matches : null
      $scope.taggingIndex = searchResults ? searchResults.index : null
      $scope.cursorPosition = cursorPosition
      $scope.$apply()
    }

    // Sets $scope.username for our click event listener (below) to use
    $scope.handleClick = function (username) {
      $scope.username = username
    }
  }

  link(scope, element, attrs) {
    const matchesEl = element[0].getElementsByClassName('matches')[0]
    const textareaEl = element[0].getElementsByTagName('TEXTAREA')[0]

    // Handle user typing in textarea
    textareaEl.addEventListener('input', function (textarea) {
      scope.handleChange(textarea.target.selectionStart)
    })

    // Handle user clicking on dropdown of matched users
    matchesEl.addEventListener('click', function (event) {
      scope.text = scope.text.substring(0, scope.taggingIndex) +
                  '@' + scope.username + ' ' +
                  scope.text.substring(scope.cursorPosition, scope.text.length)

      scope.matches = null
      scope.$apply()

      textareaEl.focus()

      // Add 2 to the cursor position to add a space behind the username and make up for '@'
      textareaEl.selectionStart = scope.taggingIndex + scope.username.length + 2
      textareaEl.selectionEnd = scope.taggingIndex + scope.username.length + 2
    })
  }
}
