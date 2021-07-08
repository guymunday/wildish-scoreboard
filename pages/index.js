import ClientOnly from "../components/ClientOnly";
import ScoreBoard from "../components/ScoreBoard";

export default function Home() {
  return (
    <>
      <ClientOnly>
        <ScoreBoard />
      </ClientOnly>
    </>
  );
}
