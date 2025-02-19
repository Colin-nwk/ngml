

import { combineReducers } from '@reduxjs/toolkit';
import { api } from './api';
import authSlice from './Features/Auth/authSlice';
import userReducer from './userSlice'
import dropElementsReducer from '../slices/dropElementSlice'; 
import routeBuilderReducer from '../Redux/Features/RouteBuilder/RouteBuilderService'

const rootReducer = combineReducers({

    user: userReducer,
    auth: authSlice,
    elements: dropElementsReducer,
    routeBuilder: routeBuilderReducer,
    [api.reducerPath]: api.reducer,

});

export default rootReducer;