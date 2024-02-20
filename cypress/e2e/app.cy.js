//Test h1 en App
describe ("App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000") // visita pagina principal
    })
    it("Debería mostrarse Blog de Recetas", () => {
        cy.get("h1").contains("Blog de Recetas")
    })
})

//Test Header en App
describe ("App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000") 
    })
    it("Debería mostrarse el Header", () => {
        cy.get('.App-header')
    })
})