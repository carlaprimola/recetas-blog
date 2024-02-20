//Test botón Añadir Receta
describe ("ShowBlogs", () => {
    beforeEach(() => {
    cy.visit("http://localhost:3000")
})
    it("Debería mostrar el botón Añadir Receta", () => {
        cy.get('.card-body > .btn').contains("Añadir receta")
    })
})

//Test Imagen Receta
describe ("ShowBlogs", () => {
    beforeEach(() => {
    cy.visit("http://localhost:3000")
})
    it("Debería mostrar la imagen de la Receta", () => {
        cy.get(':nth-child(1) > .card > .img-container > .card-img-top')
    })
})

//Test botón categoría Salsas
describe ("ShowBlogs", () => {
    beforeEach(() => {
    cy.visit("http://localhost:3000")
})
    it("Debería mostrar el botón Salsas", () => {
        cy.get('.btn-group.mb-5 > :nth-child(6)')
    })
})



