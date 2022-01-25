import { AuthService } from '../../graphql/mutations/mutation-auth';
import { Types } from './actionTypes';

export const userLogin = (customerId) => (dispatch) => {
    return AuthService.getUser(customerId).then(
        (data) => {
            dispatch({
                type: Types.USER_LOGIN,
                payload: data
            });
        },
        (error) => {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) ||
            error.message ||
            error.toString();

            dispatch({
                type: Types.SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const userLogout = () => (dispatch) => {
    dispatch({
        type: Types.USER_LOGOUT,
        payload: null
    });
};
