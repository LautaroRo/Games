
import React, { useEffect, useState } from 'react'

const CirclePerfil = () => {

    const [Perfil, setPerfil] = useState([])

    useEffect(() => {

        const ultimoPerfil = async() => {
            const last = localStorage.getItem("userCredencial")
            const parseado = JSON.parse(last)
            setPerfil(parseado)
        }
        ultimoPerfil()
    }, [])


    return (

        <img style={{ borderRadius: "100%"}} className='h-[200px] w-[200px]' src={Perfil  ? Perfil.url : "https://cdn-icons-png.flaticon.com/512/44/44091.png"}></img>

    )
}

export default CirclePerfil