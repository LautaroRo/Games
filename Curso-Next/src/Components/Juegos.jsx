import React from 'react'
import "./estilos.css"
import Link from 'next/link'

const Juegos = () => {
    return (
        <div className='flex w-full justify-center flex-col h-[30em]'>


            <div className='flex w-full align-middle justify-center'>

                <Link href={"/BlackJack"}>
                    <div className='flex w-40 h-52 my-14 mx-14 relative justify-center items-center' style={{ borderRadius: "10px" }}>

                        <div className='absolute h-1 w-full animacion rounded-lg arriba'></div>
                        <div className='absolute left-0 w-1 animacion rounded-lg modos'></div>

                        <h2 className='rotate-45'>Blackjack</h2>

                        <div className='absolute bottom-0 w-full h-1 animacion rounded-lg'></div>
                        <div className='absolute right-0 w-1 animacion rounded-lg modos' ></div>
                    </div>
                </Link>


                <Link href={"/Memoria"}>
                    <div className='flex w-40 h-52 m-14 relative justify-center items-center' style={{ borderRadius: "10px" }}>

                        <div className='absolute h-1 w-full animacion rounded-lg arriba'></div>
                        <div className='absolute left-0 w-1 h-1 animacion rounded-lg modos'></div>

                        <h2 className='rotate-45'>Memoria</h2>

                        <div className='absolute bottom-0 w-full h-1 animacion rounded-lg'></div>
                        <div className='absolute right-0 w-1 animacion rounded-lg modos' ></div>

                    </div>
                </Link>



            </div>
        </div>
    )
}

export default Juegos