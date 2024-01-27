"use client"
import React, { useEffect, useState } from 'react'

const Blackjack = () => {
    const [Crupier, setCrupier] = useState(0)
    const [Jugador, setJugador] = useState(0)
    const [Start, setStart] = useState(false)
    const [Cartas, setCartas] = useState([])



    useEffect(() => {

        const TraerCartas = async () => {

            try {
                const api = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
                const data = await api.json()

                const id = data?.deck_id

                const cartas = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=52`)
                const cartasjson = await cartas.json()
                let info = []

                for(let i = 0; cartasjson?.cards?.length > i; i++){

                    let valores = {
                        Imagen: cartasjson?.cards[i]?.image,
                        Valor: ["KING", "QUEEN", "JACK", "ACE"].includes(cartasjson?.cards[i]?.value)
                        ? cartasjson?.cards[i]?.value.toString()
                        : parseInt(cartasjson?.cards[i]?.value)
                    }
                    info.push(valores)
                }
                setCartas(info)
            }
            catch {
                console.log(error)
            }

        }
        TraerCartas()

    }, [])


    const Random = (e) => {
        e.preventDefault()
        const indiceAleatorio = Math.floor(Math.random() * Cartas.length);
        const carta = Cartas[indiceAleatorio];

        if (carta === "King" || carta === "JACK" || carta === "QUEEN") {
            setJugador(Valores => Valores + 10)
        }

        if (typeof carta === 'number') {
            setJugador(Valores => Valores + carta)
        }
    }

    const Comenzar = (e) => {
        e.preventDefault()
        setStart(true)
        let valoresSeleccionados = []
        for (let i = 0; 4 > i; i++) {

            const indiceAleatorio = Math.floor(Math.random() * Cartas.length);
            const carta = Cartas[indiceAleatorio];
            if (carta?.Valor === "KING" || carta?.Valor === "JACK" || carta?.Valor === "QUEEN") {
                let valor = {
                    Valor: 10,
                    Imagen: carta?.Imagen
                }
                valoresSeleccionados.push(valor)
            }
            if (typeof carta?.Valor === 'number') {

                let valor = {
                    Valor: carta?.Valor,
                    Imagen: carta?.Imagen
                }
                valoresSeleccionados.push(valor)

            }
            if (carta?.Valor === "ACE") {

                valoresSeleccionados.push("ACE")

            }
        }



        if (valoresSeleccionados[0] !== "ACE") {

            let valor = {
                Valor: valoresSeleccionados[0]?.Valor,
                Imagen: valoresSeleccionados[0]?.Imagen,
            }
            console.log(valoresSeleccionados[0])
            setJugador(valor)

        } else {

            let valor = {
                Valor: 11,
                Imagen: valoresSeleccionados[0]?.Imagen,
            }
            setJugador(valor)
        }


        if (valoresSeleccionados[1] !== "ACE") {
            setTimeout(() => {
                let valor = {
                    Valor: valoresSeleccionados[1]?.Valor,
                    Imagen: valoresSeleccionados[1]?.Imagen,
                }
                setCrupier(valor)
            }, 1000);
        } else {

            setTimeout(() => {
                let valor = {
                    Valor: 11,
                    Imagen: valoresSeleccionados[1]?.Imagen,
                }
                setCrupier(valor)
            }, 1000);
        }
        /*--

        if (valoresSeleccionados[2] !== "ACE") {
            setTimeout(() => {
                setJugador(Valores => Valores + valoresSeleccionados[2])
            }, 2000);
        } else {

            if (Jugador + 11 <= 21) {
                setJugador(Valores => Valores + 11)
            } else {
                setJugador(Valores => Valores + 1)
            }
        }


        if (valoresSeleccionados[3] !== "ACE") {
            setTimeout(() => {
                setCrupier(Valores => Valores + valoresSeleccionados[3])
            }, 3000);
        } else {
            if (Crupier + 11 <= 21) {
                setCrupier(Valores => Valores + 11)
            } else {
                setCrupier(Valores => Valores + 1)
            }
        }
        --*/
        
    }

console.log(Jugador)
    return (
        <div className='flex flex-col justify-center items-center' style={{
            background: "url(https://i.pinimg.com/originals/fc/98/0b/fc980b6ec648175e3c8ac9e9f1ed57f2.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh"
        }}>
            <div className={Start ? "hidden" : 'flex items-center w-full justify-center'}>
                <button className='flex w-48 h-16 bg-green-200 justify-center items-center' style={{ color: "black", borderRadius: "30px" }} onClick={Comenzar}>Jugar</button>
            </div>


            {
                Start === true
                    ?
                    
                    <div className='flex h-full flex-col w-full items-center'>

                        <div className='my-16'>
                            {Crupier?.Valor}
                        </div>


                        <div style={{ bottom: "0" }} className='absolute my-16'>
                            {Jugador?.Valor}
                            <img src={Jugador?.Imagen}></img>
                        </div>
                    </div>
                    
                    :
                    null

            }


        </div>
    )
}

export default Blackjack