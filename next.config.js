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
    trailingSlash: false,
    env: {
        // HOST
        HOST_API_KEY: 'https://test-khovd-mobileadmin.digitalaimag.mn/',
        HOST_API_IMAGE_KEY: 'https://test-khovd-mobileapp.digitalaimag.mn/api/files/',
        HOST_IMAGE_UPLOAD_KEY: 'https://test-khovd-mobileapp.digitalaimag.mn/api/upload/',
        HOST_FILE_UPLOAD_KEY: 'https://test-khovd-mobileapp.digitalaimag.mn/api/files/',
        LOGIN_URL: 'https://test-khovd-mobileauth.digitalaimag.mn/oauth',
        LOGIN_AUTH_USERNAME: 'digitaluvs',
        LOGIN_AUTH_PASSWORD: '123',
        TABLE_ROW_PER_PAGE: 6,
    },
});
