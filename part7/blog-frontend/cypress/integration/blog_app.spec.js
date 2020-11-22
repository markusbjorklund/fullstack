describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Snake Plissken',
      username: 'snake',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('snake')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Snake Plissken logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('snake')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('html').should('not.contain', 'Snake Plissken logged in')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'snake', password: 'salasana' })
      })

      it('A blog can be created', function () {
        cy.contains('new blogpost').click()
        cy.get('html').should('contain', 'create new')
        cy.get('#title').type('A dark night in NY')
        cy.get('#author').type('Snakeman')
        cy.get('#url').type('https://en.wikipedia.org/wiki/Snake_Plissken')
        cy.get('#create-button').click()

        cy.contains('A dark night in NY by Snakeman')
        cy.get('.success').should('contain', 'A dark night in NY by Snakeman added')
      })

      it('A blog can be liked', function () {
        cy.contains('new blogpost').click()
        cy.get('html').should('contain', 'create new')
        cy.get('#title').type('A dark night in NY')
        cy.get('#author').type('Snakeman')
        cy.get('#url').type('https://en.wikipedia.org/wiki/Snake_Plissken')
        cy.get('#create-button').click()
        cy.get('#view-button').click()
        cy.get('#like-button').click()
        cy.get('html').should('contain', 'likes 1')
        cy.get('#like-button').click()
        cy.get('html').should('contain', 'likes 2')
      })

      it('A blog can be deleted', function () {
        cy.contains('new blogpost').click()
        cy.get('html').should('contain', 'create new')
        cy.get('#title').type('A dark night in NY')
        cy.get('#author').type('Snakeman')
        cy.get('#url').type('https://en.wikipedia.org/wiki/Snake_Plissken')
        cy.get('#create-button').click()
        cy.get('#view-button').click()
        cy.get('#delete-button').click()
        cy.get('.visible').should('not.contain', 'A dark night in NY')
      })

      describe('Blogs are sorted by likes', function () {
        beforeEach(function () {
          cy.createBlog({ title: 'A sunny day (with 2 likes)', url: 'https://en.wikipedia.org/wiki/Snake_Plissken', author: 'Snake Plissken', likes: '2' })
          cy.createBlog({ title: 'A dark night (with 100 likes)', url: 'https://en.wikipedia.org/wiki/Snake_Plissken', author: 'Snake Plissken', likes: '100' })
          cy.createBlog({ title: 'A dark night (with no likes)', url: 'https://en.wikipedia.org/wiki/Snake_Plissken', author: 'Snake Plissken' })
        })

        it('Blogs with most likes is at top', function () {
          cy.get('.visible').eq(0).should('contain', 'likes 100')
          cy.get('.visible').eq(1).should('contain', 'likes 2')
        })
      })
    })
  })
})