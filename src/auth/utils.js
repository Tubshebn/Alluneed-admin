import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

export const jwtDecode = (token) => {
    return jwt_decode(token);
};

export const setSession = (accessToken) => {
    accessToken && Cookies.set('accessToken', accessToken, { expires: 3 });
};

export const removeSession = () => {
    Cookies.remove('accessToken');
};

export const tokenCheck = () => {
    let payload;

    if (Cookies.get('accessToken')) {
        let user = jwt_decode(Cookies.get('accessToken'));
        payload = {
            token: Cookies.get('accessToken'),
            isLoggedIn: true,
            user,
        };
    } else {
        payload = {
            token: null,
            isLoggedIn: false,
            user: null,
        };
    }
    return payload;
};

export const toastExpireAccess = () => {
    return toast.error('Хандах эрх дууссан байна', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
    });
};
