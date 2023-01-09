import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const setSession = (accessToken) => {
  accessToken
    ? Cookies.set('accessToken', accessToken, { expires: 3 })
    : Cookies.remove('accessToken');
};

export const removeSession = () => {
  Cookies.remove('accessToken');
};

export const tokenCheck = () => {
  let payload;
  if (Cookies.get('accessToken')) {
    payload = {
      token: Cookies.get('accessToken'),
      isLoggedIn: true,
    };
  } else {
    payload = {
      token: null,
      isLoggedIn: false,
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
