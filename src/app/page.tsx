import dynamic from 'next/dynamic';

const PhaserGame = dynamic(() => import('./components/game'), { ssr: false });

export default function Home() {
  return (
      <PhaserGame />
  );
}
