import { useAuthContext } from 'src/auth/useAuthContext';
const useSwrFetcher = () => {
  const {
    handlers: { POST, GET },
  } = useAuthContext();
  const postFetcher = (args) => POST(args[0], (args[1] = false), args[2], (args[3] = 'application/json'), (args[4] = 'json'));
  const getFetcher = (args) => GET(args[0], (args[1] = false));

  return { postFetcher, getFetcher };
};
export default useSwrFetcher;
