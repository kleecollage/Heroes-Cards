import { fireEvent, render, screen } from "@testing-library/react"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"
import { MemoryRouter } from "react-router-dom"
import { expect } from "@jest/globals";

jest.mock('query-string', () => ({
    parse: jest.fn(),
    stringify: jest.fn(),
}));

const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))



describe('Pruebas en componente <SearchPage/>', () => { 
    
    beforeEach(() => jest.clearAllMocks())

    // ************************************************************** //
    test('debe de mostrarse correctamente con valores por defecto', () => { 
        require('query-string').parse.mockReturnValue({});
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );
        // screen.debug();
        expect(container).toMatchSnapshot()

    })
    // ************************************************************** //
    test('debe de mostrar a batman y el input con el query string', () => {      
        require('query-string').parse.mockReturnValue({ q: 'batman' });
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        // screen.debug()
        const input = screen.getByRole('textbox');
        const img = screen.getByRole('img')
        const showSearch = screen.getByLabelText('showSearch')
        const showError = screen.getByLabelText('showError')
        
        expect(input.value).toBe('batman')
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg')
        expect(showSearch.style.display).toBe('none')
        expect(showError.style.display).toBe('none')
    })
    // ************************************************************** //
    test('debe de mostrar un error si no se encuentra el heroe', () => { 
        require('query-string').parse.mockReturnValue({ q: 'batman123' });
                render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        const showError = screen.getByLabelText('showError')
        expect(showError.style.display).toBeFalsy
    })
    // ************************************************************** //
    test('debe de llamar el navigate a la pantalla nueva', () => {
        require('query-string').parse.mockReturnValue({ q: 'super' });
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        const searchBtn = screen.getByRole('button')
        fireEvent.click(searchBtn)

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: 'super' } })
        const form = screen.getByRole('form')
        fireEvent.submit(form)

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=super')
     })
    // ************************************************************** //
})