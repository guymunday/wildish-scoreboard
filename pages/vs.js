import ClientOnly from "../components/ClientOnly"
import Verses from "../components/Verses"

export default function VPage() {
  return (
    <>
      <ClientOnly>
        <Verses />
      </ClientOnly>
    </>
  )
}
