import "@/styles/tokens.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { absoluteUrl } from '@/lib/seo/site-url';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.asPath.split('?')[0] || '/';
  return <><Head><link key="canonical" rel="canonical" href={absoluteUrl(path)} /><meta property="og:site_name" content="SINOTRUK TEAM" /></Head><Component {...pageProps} /></>;
}
