import { render, screen } from '@testing-library/react'
import Link from './ShowBlogs.js'


//Test Link boton Añadir receta
describe("<Link />", () => {
    test("prueba del boton Añadir nueva receta", () => {
        render(<Link />);
        const buttonElement = screen.getAllByText(/Añadir receta/i);

        expect(buttonElement).toBeInTheDocument();
    })
})