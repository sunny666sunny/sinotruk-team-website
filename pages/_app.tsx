import "@/styles/tokens.css";
import "@/styles/globals.css";
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/600.css'
import '@/styles/industrial-theme.css'
import type { AppProps } from "next/app";
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { absoluteUrl } from '@/lib/seo/site-url';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.asPath.split('?')[0] || '/';
  const isAdminRoute = router.pathname.startsWith('/admin');

  useEffect(() => {
    document.body.classList.toggle('industrial-site', !isAdminRoute);
    return () => document.body.classList.remove('industrial-site');
  }, [isAdminRoute]);

  return <><Head><link key="canonical" rel="canonical" href={absoluteUrl(path)} /><meta property="og:site_name" content="SINOTRUK TEAM" /></Head><Component {...pageProps} /></>;
}
