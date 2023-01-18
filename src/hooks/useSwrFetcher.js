import { useAuthContext } from 'src/auth/useAuthContext';

const useSwrFetcher = () => {
  const {
    handlers: { POST, GET, DELETE },
  } = useAuthContext();

  const postFetcher = (args) => POST(args[0], args[1] || false, args[2] || '', args[3] || 'application/json', args[4] || 'json');
  const getFetcher = (args) => GET(args[0], args[1] || false);
  const deleteFetcher = (args) => DELETE(args[0], args[1] || false, args[2] || 'json');
  const formFetcher = (url, { arg }) => {
    let arr = [url, true, arg.body, arg.type || 'application/json'];
    return postFetcher(arr);
  };
  return { postFetcher, getFetcher, deleteFetcher, formFetcher };
};

export default useSwrFetcher;
