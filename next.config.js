const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY_LOGIN: '',
    HOST_IMAGE_URL: '',
    HOST_API_APP: '',
    HOST_API_TEST: '',
    HOST_API: '',
    HOST_BASIC_AUTH_USER: '',
    HOST_BASIC_AUTH_PASSWORD: '',
  },
});
