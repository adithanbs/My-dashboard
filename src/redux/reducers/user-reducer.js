import { createAction, createReducer } from '@reduxjs/toolkit';
import { Types } from '../actions/actionTypes';

const userLogin = createAction(Types.USER_LOGIN);
const userLogout = createAction(Types.USER_LOGOUT);

export const userReducer = createReducer(
    {},
    (builder) => {
        builder
            .addCase(userLogin, (state, action) => {
                return {
                    ...state ,
                    ...action.payload.data.getCustomers,
                    address: {
                        ...action.payload.data.getCustomers.address
                    }
                };
            })
            .addCase(userLogout, (state, action) => {
                return {};
            })
            .addDefaultCase((state) => state);
    }
);
