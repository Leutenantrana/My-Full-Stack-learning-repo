describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            username: 'sagar',
            name: 'Sagar Rana',
            password: 'savy'

        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
    })
    it('login fails with wrong credentials', () => {
        cy.contains('log in').click()
        cy.get('#username').type('sagar')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.contains('wrong credentials')
    })
    it('front page can be opened', function () {

        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
    })

    it('user can log in', function () {
        cy.contains('log in').click()
        cy.get('#username').type('sagar')
        cy.get('#password').type('savy')
        cy.get('#login-button').click()

        cy.contains('Sagar Rana logged in')
    })
    it('then example', function () {
        cy.get('button').then(buttons => {
            console.log('number of buttons', buttons.length)
            cy.wrap(buttons[0]).click()
        })
    })
    describe('when logged in', function () {
        describe('when several notes exists', function () {
            beforeEach(function () {
                cy.login({ username: 'sagar', password: 'savy' })
                cy.createNote({ content: 'first note', important: false })
                cy.createNote({ content: 'second note', important: false })
                cy.createNote({ content: 'third note', important: false })

            })
            it('one of those can be made important', function () {
                cy.contains('second note')
                    .contains('make important')
                    .click()

                cy.contains('second note')
                    .contains('make not important')
            })
        })


    })

})