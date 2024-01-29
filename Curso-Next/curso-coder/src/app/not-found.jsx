"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import "./estilos.css"
const notfound = () => {

    const router = useRouter()
    return (
        <div className='flex justify-center items-center h-[100vh] flex-col'>
            
            <p className='my-6'>Pagina No encontrada!!!</p>

            <button className="mx-5 cursor-pointer shadow p-3 rounded-[20px] bg-purple-800" onClick={() => router.back()}>Volver</button>
        </div>

    )
}

export default notfound