import { userActions } from '../Reducer/user';

export const login = (response) => {
    return async dispatch => {
        try {
            localStorage.setItem('clientToken', JSON.stringify(response.token))
            localStorage.setItem('role', JSON.stringify(response.user.role));
            localStorage.setItem('user', JSON.stringify(response.user));
            dispatch(userActions.CHANGE_LOGIN(true));
            dispatch(userActions.UPDATE_USER(response.user));
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const signup = (response) => {
    return async dispatch => {
        try {
            localStorage.setItem('client', JSON.stringify(response.token))
            localStorage.setItem('role', JSON.stringify(response.user.role));
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        catch (error) {
            console.log(error)
        }
        dispatch(userActions.CHANGE_LOGIN(true));
        dispatch(userActions.UPDATE_USER(response.user));
    }
}

export const signout = () => {
    return async dispatch => {
        try {
            localStorage.removeItem("user");
            dispatch(userActions.CHANGE_LOGIN(false));
        } catch (error) {
            console.log(error)
        }
    }
}
