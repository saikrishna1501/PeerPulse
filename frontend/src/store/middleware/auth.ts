import { loginFailed } from "../auth";

const auth = ({ dispatch, getState }: any) => (next: any) => (action: any) => {

    // Check if action doesn't need auth
    /*
        Unauthenticated action for API call ( for eg - SignUp action )

        {
            type: 'apiCallBegan',
            meta: {
                skipAuth: true
            }
            payload: { ... }
        }

    */
    if( !!action.meta && action.meta.skipAuth ) return next(action);

    // Now handle action requiring auth
    const isLoggedIn = getState().auth.isLoggedIn;

    // Handle auth failure
    if(!isLoggedIn) return dispatch({ type: loginFailed.type, payload: null});

    // If auth is correct send to next middleware
    next(action);

}

export default auth;

