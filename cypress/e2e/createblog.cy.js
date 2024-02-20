//Test botón Añadir Receta dentro de formulario
describe ("CreateBlog", () => {
    beforeEach(() => {
    cy.visit("http://localhost:3000/create")
})
    it("Debería mostrar el botón Añadir", () => {
        cy.get('.btn').contains("Añadir")
    })
})


//Test formulario
describe ("CreateBlog", () => {
    beforeEach(() => {
    cy.visit("http://localhost:3000/create")
})
    it("Debería mostrar el formulario", () => {
        cy.get('main')
    })
})


