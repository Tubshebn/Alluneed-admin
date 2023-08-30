import React, { useEffect, useReducer } from 'react';
import { HOST_API_KEY, HOST_IMAGE_UPLOAD_KEY, HOST_FILE_UPLOAD_KEY } from '../config-global';
import { setSession, removeSession, tokenCheck, toastExpireAccess, jwtDecode } from './utils';
import AuthReducer from 'src/context/Auth/authReducer';
import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
   baseURL: HOST_API_KEY,
   timeout: 30000,
});

export const Api = () => {
   const initialState = {
      userToken: null,
      isLoggedIn: false,
      user: null,
   };

   useEffect(() => {
      isCheckUser();
   }, []);

   const isCheckUser = () => {
      dispatch({ type: 'IS_LOGGED_IN', payload: tokenCheck() });
   };

   const [state, dispatch] = useReducer(AuthReducer, initialState);

   const handlers = React.useMemo(
      () => ({
         //хэрэглэгчийн нэвтрэх
         signIn: async (token) => {
            let payload = {
               token,
               isLoggedIn: true,
               user: jwtDecode(token),
            };
            setSession(token);
            dispatch({ type: 'IS_LOGGED_IN', payload });
         },

         //хэрэглэгч гарах
         logOut: () => {
            removeSession();
            dispatch({ type: 'SIGN_OUT' });
         },

         stateDynamicUpdate: (obj) => {
            // payload = {
            //    type: obj.type,
            //    value: obj.value,
            // };
            dispatch({ type: 'DYNAMIC_UPDATE', payload: obj });
         },

         GET: async (url, isToken = false, contentType = 'application/json', responseType = 'json') => {
            try {
               let response = await instance.get(
                  url,
                  isToken
                     ? {
                          headers: {
                             Authorization: `Bearer ${state?.userToken}`,
                             'Content-Type': contentType,
                          },
                          responseType,
                       }
                     : ''
               );
               if (response?.status === 200 && response?.data) {
                  return response?.data;
               }
            } catch (e) {
               if (e?.response?.status === 401) {
                  handlers.logOut();
                  toastExpireAccess();
               }
               const error = new Error();
               error.status = e?.response?.status;
               throw error;
            }
         },

         POST: async (url, isToken = false, data, contentType = 'application/json', responseType = 'json') => {
            try {
               let response = await instance.post(
                  url,
                  data,
                  isToken
                     ? {
                          headers: {
                             Authorization: `Bearer ${state.userToken}`,
                             'Content-Type': contentType,
                          },
                          responseType,
                       }
                     : ''
               );
               if (response?.status === 200 && response?.data) {
                  return response.data;
               }
            } catch (e) {
               if (e?.response?.status === 401) {
                  handlers.logOut();
                  toastExpireAccess();
               }
               const error = new Error();
               error.status = e?.response?.status;
               throw error;
            }
         },

         PUT: async (url, isToken = false, data) => {
            try {
               let response = await instance.put(
                  url,
                  data,
                  isToken
                     ? {
                          headers: {
                             Authorization: `Bearer ${state.userToken}`,
                          },
                       }
                     : ''
               );
               if (response?.status === 200 && response?.data) {
                  return response.data;
               }
            } catch (e) {
               if (e?.response?.status === 401) {
                  handlers.logOut();
                  toastExpireAccess();
               }
               const error = new Error();
               error.status = e?.response?.status;
               throw error;
            }
         },
         DELETE: async (url, isToken = false, responseType = 'json') => {
            try {
               let response = await instance.delete(
                  url,
                  isToken
                     ? {
                          headers: {
                             Authorization: `Bearer ${state.userToken}`,
                          },
                          responseType,
                       }
                     : ''
               );
               if (response?.status === 200 && response?.data) {
                  return response.data;
               }
            } catch (e) {
               if (e?.response?.status === 401) {
                  handlers.logOut();
                  toastExpireAccess();
               }
               const error = new Error();
               error.status = e?.response?.status;
               throw error;
            }
         },

         IMAGEUPLOAD: async (isToken = false, data, contentType) => {
            try {
               return await axios.post(
                  `${HOST_IMAGE_UPLOAD_KEY}`,
                  data,
                  isToken
                     ? {
                          headers: {
                             Authorization: `Bearer ${state.userToken}`,
                             'Content-Type': contentType,
                          },
                       }
                     : ''
               );
            } catch (e) {
               return e;
            }
         },
         FILEUPLOAD: async (isToken = false, data, contentType) => {
            try {
               return await axios.post(
                  `${HOST_FILE_UPLOAD_KEY}${url}`,
                  data,
                  isToken
                     ? {
                          headers: {
                             Authorization: `Bearer ${state.userToken}`,
                             'Content-Type': contentType,
                          },
                       }
                     : ''
               );
            } catch (e) {
               return e;
            }
         },
      }),
      [state]
   );
   return { handlers, state, dispatch };
};
