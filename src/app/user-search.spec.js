import UserSearch from './user-search.js'

describe('UserSearch', () => {
  it('should match one user with "rlewish" in name or username', function() {
    const matches = UserSearch('yo @rlewish').matches
    expect(matches.length).toBe(1)
  })

  it('should match four users with "james" in name or username', function() {
    const matches = UserSearch('yo @james').matches
    expect(matches.length).toBe(4)
  })

  it('should return index of the user tag', function() {
    const index = UserSearch('yo @james').index
    expect(index).toBe(3)
  })
})
