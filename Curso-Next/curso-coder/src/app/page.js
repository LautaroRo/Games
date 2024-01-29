import Header from '@/Components/Header'
import Juegos from '@/Components/Juegos'


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-full min-h-full align-middle">
      <Header/>
      <Juegos/>

    </main>
  )
}
