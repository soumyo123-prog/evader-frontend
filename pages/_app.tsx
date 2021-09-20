import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth';
import { SidebarProvider } from '../context/sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </AuthProvider>
  );
}
export default MyApp;
