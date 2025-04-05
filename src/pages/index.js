import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>PWA Test</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <main>
        <h1>PWA для тестування worbox та відмову від next-pwa</h1>
      </main>
    </div>
  );
}
