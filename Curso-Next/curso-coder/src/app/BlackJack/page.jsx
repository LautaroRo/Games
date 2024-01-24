"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Tablero from "./../../Assets/Tablero.jpeg"
const Blackjack = () => {
    const [Crupier, setCrupier] = useState(0)
    const [Jugador, setJugador] = useState(0)
    const [Start, setStart] = useState(false)
    const Valor = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Q", "J", "K", "A"]


    const Random = (e) => {
        e.preventDefault()
        const indiceAleatorio = Math.floor(Math.random() * Valor.length);
        const carta = Valor[indiceAleatorio];

        if (carta === "Q" || carta === "J" || carta === "K") {
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

            const indiceAleatorio = Math.floor(Math.random() * Valor.length);
            const carta = Valor[indiceAleatorio];

            if (carta === "Q" || carta === "J" || carta === "K") {
                let diez = 10
                valoresSeleccionados.push(diez)
            }
            if (typeof carta === 'number') {
                valoresSeleccionados.push(carta)
            }
            if (carta === "A") {
                valoresSeleccionados.push("A")
            }
        }

        if (valoresSeleccionados[0] !== "A") {
            setJugador(Valores => Valores + valoresSeleccionados[0])
        } else {

            setJugador(Valores => Valores + 11)
        }


        if (valoresSeleccionados[1] !== "A") {
            setTimeout(() => {
                setCrupier(Valores => Valores + valoresSeleccionados[1])
            }, 1000);
        } else {

            setTimeout(() => {
                setCrupier(Valores => Valores + 11)
            }, 1000);
        }

        if (valoresSeleccionados[2] !== "A") {
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


        if (valoresSeleccionados[3] !== "A") {
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
    }


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
                <button className='flex w-48 h-16 bg-green-200 justify-center items-center' style={{ color: "black", borderRadius:"30px" }} onClick={Comenzar}>Jugar</button>
            </div>

        </div>
    )
}

export default Blackjack