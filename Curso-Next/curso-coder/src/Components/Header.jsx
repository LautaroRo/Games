"use client"
import React from 'react'
import "./estilos.css"
import Link from 'next/link'

const Header = () => {

    const Salir = (e) => {
        e.preventDefault()

        e.target.classList.add("Salida")
    }

    const Entrar = (e) => {
        e.preventDefault()

        e.target.classList.remove("Salida")
    }

    return (
        <>
            <div className='w-full p-6 cabecera'>
                <header className='flex w-full bg-black relative align-middle justify-center head'>

                    {/*-Lineas fluor--*/}
                    <div className='absolute h-1 w-full animacion rounded-lg'></div>
                    <div className='absolute left-0 w-1 h-20 animacion rounded-lg head'></div>
                    <div className='absolute bottom-0 w-full h-1 animacion rounded-lg'></div>
                    <div className='absolute right-0 w-1 h-20 animacion rounded-lg head' ></div>
                    {/*-Lineas fluor--*/}

                    <div className='flex justify-between inside'>
                        <h1 className='flex align-middle text-2xl text-fuchsia-700'>Tienda</h1>
                        <nav>
                            <ul className='flex'>
                                <li onMouseLeave={Salir} onMouseEnter={Entrar} className='mx-5 cursor-pointer shadow'><Link href={"/"}>Inicio</Link></li>
                                <li onMouseLeave={Salir} onMouseEnter={Entrar} className='mx-5 cursor-pointer shadow'><Link href={"/CrearMap"}>Crear perfil</Link></li>
                                <li onMouseLeave={Salir} onMouseEnter={Entrar} className='mx-5 cursor-pointer shadow'><Link href={"/IniciarMap"}>Iniciar Sesion</Link></li>
                            </ul>
                        </nav>

                    </div>

                </header>
            </div>
        </>
    )
}

export default Header