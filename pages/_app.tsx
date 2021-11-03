/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../context/auth';
import { SidebarProvider } from '../context/sidebar';
import Navbar from '../components/navbar/navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* <script src="https://apis.google.com/js/client.js" /> */}
        <script
          src="https://apis.google.com/js/platform.js?onload=init"
          async
          defer
        />
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
