import Header from '@/Components/Header'
import Juegos from '@/Components/Juegos'
import Title from '@/Components/Title'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-full min-h-full align-middle">
      <Header/>
      {/*--<Title/>--*/}
      <Juegos/>
    </main>
  )
}
