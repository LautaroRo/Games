import Header from '@/Components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-full min-h-full align-middle">
      <Header/>
      {/*--<Juegos/>--*/}
      <Link href={"/BlackJack"}>Ir a blackjack</Link>
    </main>
  )
}
