import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui/components/NavBar";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { beforeEach, expect } from "@jest/globals";

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas sobre componente <NavBar/>', () => { 
    const contextValue = {
        logged: true,
        user: {
            id: 123,
            name: 'Jhon Doe'
        },
        logout: jest.fn()
    };
    
    beforeEach(() => jest.clearAllMocks())
    
    // ************************************************* //
    test('debe mostrar el nombre del usuario', () => { 
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getByText('Jhon Doe')).toBeTruthy;
    })
    // ************************************************* //
    test('debe llamar logout y navigate cuando se hace click en el boton', () => { 
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled()
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {replace: true})
    })
    // ************************************************* //
 })