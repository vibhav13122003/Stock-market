    import { userActions } from '../Reducer/user';

export const login = (response) => {
    return async (dispatch) => {
        try {
            localStorage.setItem('clientToken', JSON.stringify(response.token)); // Fix: Store with 'clientToken'
            localStorage.setItem('role', JSON.stringify(response.user.role));
            localStorage.setItem('user', JSON.stringify(response.user));

            dispatch(userActions.CHANGE_LOGIN({ user: response.user, token: response.token }));
            dispatch(userActions.UPDATE_USER(response.user));
        } catch (error) {
            console.log(error);
        }
    };
};

export const signup = (response) => {
    return async (dispatch) => {
        try {
            localStorage.setItem('clientToken', JSON.stringify(response.token)); // Fix: Store with 'clientToken'
            localStorage.setItem('role', JSON.stringify(response.user.role));
            localStorage.setItem('user', JSON.stringify(response.user));

            dispatch(userActions.CHANGE_LOGIN({ user: response.user, token: response.token }));
            dispatch(userActions.UPDATE_USER(response.user));
        } catch (error) {
            console.log(error);
        }
    };
};

export const signout = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('clientToken'); // Fix: Remove 'clientToken' instead of 'token'
            dispatch(userActions.CHANGE_LOGIN(false));
        } catch (error) {
            console.log(error);
        }
    };
};

export const isSignin = () => {
    return (dispatch) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = JSON.parse(localStorage.getItem('clientToken')); // Fix: Fetch 'clientToken'

            if (user && token) {
                dispatch(userActions.CHANGE_LOGIN({ user, token }));
            } else {
                dispatch(userActions.CHANGE_LOGIN(false));
            }
        } catch (error) {
            console.error(error);
            dispatch(userActions.CHANGE_LOGIN(false));
        }
    };
};
