
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

        <img style={{ borderRadius: "100%"}} className='h-[200px] w-[200px]' src={Perfil  ? Perfil.url : "https://static.vecteezy.com/system/resources/previews/008/143/361/non_2x/question-icon-question-sign-help-sign-icon-question-mark-symbol-free-vector.jpg"}></img>

    )
}

export default CirclePerfil