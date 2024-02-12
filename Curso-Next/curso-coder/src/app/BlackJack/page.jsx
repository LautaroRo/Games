import React from 'react'
import { cartas } from '../ApiBlackjack'
import Blackjack from '../../Components/BlackJack'
export const metadata = {
    title: "Blackjack Juego"
}
const page = async () => {


    const cartasConst = await fetch(cartas)
    const cartasjson = await cartasConst.json()


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


    return (
    <Blackjack cartas={info}>
        
    </Blackjack>
    )
}

export default page