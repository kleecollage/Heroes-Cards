import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { MemoryRouter } from "react-router-dom"
import { AppRouter } from "../../src/router/AppRouter"
import { expect } from "@jest/globals"

describe('Pruebas en componenete <AppRouter/>', () => { 
    // ************************************************************ //
    test('debe mostrar el login si no está autenticado', () => { 
        const contextValue = {
            logged: false
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getAllByText('Login').length).toBe(2);
    })
    // ************************************************************ //
    test('debe mostrar el componente de Marvel si está autenticado', () => { 
        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Jhon Doe'
            }
        };
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByText('Jhon Doe')).toBeTruthy();
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
     })
 })