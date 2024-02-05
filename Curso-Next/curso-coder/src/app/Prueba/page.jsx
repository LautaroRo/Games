import React from 'react'
import { cartas } from '../ApiBlackjack'
const page = () => {

const traerApi = async() => {

    const cartasConst = await fetch(cartas)
    const cartasjson = await cartasConst.json()
    console.log(cartas)
    let info = []

    for (let i = 0; cartasjson?.cards?.length > i; i++) {

        let valores = {
            Imagen: cartasjson?.cards[i]?.image,
            Valor: ["KING", "QUEEN", "JACK", "ACE"].includes(cartasjson?.cards[i]?.value)
                ? cartasjson?.cards[i]?.value.toString()
                : parseInt(cartasjson?.cards[i]?.value)
        }
        info.push(valores)
    }
    console.log(info)
}


traerApi()
    return (
        <div>page</div>
    )
}

export default page