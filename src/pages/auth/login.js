import Head from 'next/head';
import GuestGuard from 'src/auth/GuestGuard';
import Login from 'src/sections/auth/Login';

export default function LoginPage() {
   return (
      <>
         <Head>
            <title> Login | Bpay</title>
         </Head>
         <GuestGuard>
            <Login />
         </GuestGuard>
      </>
   );
}
