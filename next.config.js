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
    // MAPBOX
    MAPBOX_API: '',
    // FIREBASE
    FIREBASE_API_KEY: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_PROJECT_ID: '',
    FIREBASE_STORAGE_BUCKET: '',
    FIREBASE_MESSAGING_SENDER_ID: '',
    FIREBASE_APPID: '',
    FIREBASE_MEASUREMENT_ID: '',
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_DOMAIN: '',
    AUTH0_CLIENT_ID: '',
  },
});

//eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMzMsInJvbGVfaWQiOjMsInVzZXJfbmFtZSI6ImFkbWluMyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2Nzg1MjIzODksImlzX3ZlcmlmaWVkIjp0cnVlLCJhdXRob3JpdGllcyI6WyJST0xFX1NVUEVSQURNSU4iXSwianRpIjoiU3hFejVWM2tFb00wcWZLSG9OR3dDNEtxel84IiwiY2xpZW50X2lkIjoiZGlnaXRhbHV2cyJ9.eAiNyUreknz9uIM_eurWMAVLIoHw8irLk4dfTI1i5yEnN9tGY1yWBVN_Bm6BsBcRAV2X98ig_DxF_xvjIkRXShcSAaDdGLDVWKkL8eG1KBNLUyUtqyWpVrPkOfaJwjnKkuEZ3ef6M1-UNNIpR0SpgUrR9N-SThyWvi61cppiryGOPG3EF1Ogw2gEysJzUyhGg1HKrKMmVFVqlZVh6ba6iPVaVEHIwQ6SZOKvNnVlcsRoxg_cFLV-F55wW2hXO-VxK_5qo69PHMBHuu5B3tDqG7mo0uIJpfuM4jk81HsuEwu5MsfJnChJpzakanDBYaf0vrXdj0x2DXoMIgj00Dz8tA