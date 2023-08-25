import { UsuarioClass } from "../interfaces/userInterface";



export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    errorMessage: string;
    token: string | null;
    user: UsuarioClass | null;
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: UsuarioClass } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user:null, 
                token:null, 
                status:'not-authenticated',
                errorMessage: action.payload
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }
        case 'signUp':
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                status: 'authenticated',
                errorMessage: ''
            }
        case "notAuthenticated":
        case "logout":
            return {
                ...state,
                token: null,
                user:null,
                status: 'not-authenticated',
            }

        default:
           return state
    }
}