import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../context/auth';
import { SidebarProvider } from '../context/sidebar';
import Navbar from '../components/navbar/navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="https://apis.google.com/js/client.js" />
      </Head>
      <AuthProvider>
        <SidebarProvider>
          <Navbar />
          <Component {...pageProps} />
        </SidebarProvider>
      </AuthProvider>
    </>
  );
}
export default MyApp;
