import React, { useEffect, useReducer } from 'react';
import AuthReducer from 'src/context/Auth/authReducer';
import axios from 'axios';
import { HOST_API_KEY, HOST_IMAGE_KEY, HOST_FILE_KEY } from '../config-global';
import { setSession, removeSession, tokenCheck, toastExpireAccess, jwtDecode } from './utils';

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
        //   payload = {
        //    type:obj.type
        //    value:obj.value
        //  }
        dispatch({ type: 'DYNAMIC_UPDATE', payload: obj });
      },
      GET: async (url, isToken = false, contentType = 'application/json',responseType = 'json') => {
        try {
          return instance.get(
            url,
            isToken
              ? {
                  headers: {
                    Authorization: `Bearer ${state.userToken}`,
                    'Content-Type': contentType
                  },
                  responseType,
                }
              : ''
          );
        } catch (e) {
          if (e?.response?.status === 401) {
            handlers.logOut();
            toastExpireAccess();
          }
          return e;
        }
      },

      POST: async (url, isToken = false, data, contentType = 'application/json',responseType = 'json') => {
        try {
          return await instance.post(
            url,
            data,
            isToken
              ? {
                  headers: {
                    Authorization: `Bearer ${state.userToken}`,
                     'Content-Type': contentType
                  },
                  responseType,
                }
              : ''
          );
        } catch (e) {
          if (e?.response?.status === 401) {
            handlers.logOut();
            toastExpireAccess();
          }
          return e;
        }
      },

      PUT: async (url, isToken = false, data) => {
        try {
          return await instance.put(
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
        } catch (e) {
          if (e?.response?.status === 401) {
            handlers.logOut();
            toastExpireAccess();
          }
          return e;
        }
      },
      IMAGEUPLOAD: async (url, isToken = false, data) => {
        try {
          return await axios.post(
            `${HOST_IMAGE_KEY}${url}`,
            data,
            isToken
              ? {
                  headers: {
                    Authorization: `Bearer ${state.userToken}`,
                  },
                }
              : ''
          );
        } catch (e) {
          return e;
        }
      },
      FILEUPLOAD: async (url, isToken = false, data) => {
        try {
          return await axios.post(
            `${HOST_FILE_KEY}${url}`,
            data,
            isToken
              ? {
                  headers: {
                    Authorization: `Bearer ${state.userToken}`,
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
