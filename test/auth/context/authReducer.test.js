import { authReducer, types } from "../../../src/auth"

describe('Pruebas en authReducer', () => { 
    // *****************************************************
    test('debe de retornar el estado por defecto', () => {
        const state = { logged: false };
        const action = { type: 'unknow' };
        const initialState = authReducer(state, action);
        // console.log(initialState);

        expect(initialState).toEqual(state)
    })
    // *****************************************************
    test('debe de (login) llamar el login, autenticar y establecer el user', () => { 
        const state = { logged: false };
        const action = {
            type: types.login,
            payload: {
                user: 'Jhon Doe',
                id: 123
            }
        };
        const expectedState = {
            logged: true,
            user: action.payload
        };
        const newState = authReducer(state, action);

        expect(newState).toEqual(expectedState)
    })
    // *****************************************************
    test('debe de (logout) borrar el name del usuario y logged en false', () => { 
        const state = {
            logged: true,
            user: {
                name: 'Jhon Doe',
                id: 123
            }
        };
        const action = { type: types.logout };
        const expectedState = { logged: false };
        const newState = authReducer(state, action);
        expect(newState).toEqual(expectedState)
     })
 })