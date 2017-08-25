import data from './data.js'

/* This function takes a text string and returns an array of
   matched users and an index of the user tag */
export default function (text) {
  if (!text) return null

  const tagging = text.match(/(^|[ ])\B@[a-z0-9_-]+$/i)
  if (!tagging) return null

  /* If we match a string with a space in front of the user tag (i.e. ' @ev'),
     we add 1 to the index and remove the space before filtering user data. */
  const index = tagging[0].match(/\s+/) ? tagging.index + 1 : tagging.index
  const string = tagging[0].replace(/\s+/, '').substring(1)
  const userSearchPattern = new RegExp("\\b" + string, "gi")
  const matches = data.filter(function(user) {
    if (user.username.match(userSearchPattern) || user.name.match(userSearchPattern))
      return true
  })

  return { matches, index }
}
