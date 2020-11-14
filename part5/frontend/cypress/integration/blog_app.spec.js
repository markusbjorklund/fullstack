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

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('snake')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Snake Plissken logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('snake')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('html').should('not.contain', 'Snake Plissken logged in')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })


})