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
        HOST_API_KEY: 'http://localhost:3000/',
        HOST_API_IMAGE_KEY: 'http://localhost:3000/',
        HOST_IMAGE_UPLOAD_KEY: 'http://localhost:3000/',
        HOST_FILE_UPLOAD_KEY: 'http://localhost:3000/',
        LOGIN_URL: 'http://localhost:3000/',
        LOGIN_AUTH_USERNAME: 'http://localhost:3000/',
        LOGIN_AUTH_PASSWORD: 'http://localhost:3000/',
        TABLE_ROW_PER_PAGE: 6,
    },
});
