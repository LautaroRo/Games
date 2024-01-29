"use client"
import React, { useEffect, useState } from 'react'
import "./estilos.css"
import Header from '@/Components/Header'

const Blackjack = () => {
    const [Crupier, setCrupier] = useState([])
    const [Jugador, setJugador] = useState([])
    const [FotosJugador, setFotosJugador] = useState([])
    const [FotosCrupier, setFotosCrupier] = useState([])
    const [Start, setStart] = useState(false)
    const [Cartas, setCartas] = useState([])
    const [Mezclar, setMezclar] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setMezclar(false)
        }, 2500);

        const TraerCartas = async () => {

            try {
                const api = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
                const data = await api.json()

                const id = data?.deck_id

                const cartas = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=52`)
                const cartasjson = await cartas.json()
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
                setCartas(info)
            }
            catch {
                console.log(error)
            }

        }
        TraerCartas()

    }, [])

    /*--
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
    --*/
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
                Valor: valoresSeleccionados[0]?.Valor
            }
            setJugador([valor])
            let foto = {
                Imagen: valoresSeleccionados[0]?.Imagen
            }
            setFotosJugador([foto])

        } else {

            let valor = {
                Valor: 11
            }
            setJugador([valor])

            let foto = {
                Imagen: valoresSeleccionados[0]?.Imagen
            }
            setFotosJugador([foto])
        }


        if (valoresSeleccionados[1] !== "ACE") {
            setTimeout(() => {
                let valor = {
                    ValorPrimero: valoresSeleccionados[1]?.Valor
                }
                setCrupier([valor])

                let foto = {
                    Imagen: valoresSeleccionados[1]?.Imagen,
                }
                setFotosCrupier([foto])
            }, 1000);
        } else {

            setTimeout(() => {
                let valor = {
                    ValorPrimero: 11
                }
                setCrupier([valor])

                let foto = {
                    Imagen: valoresSeleccionados[1]?.Imagen,
                }
                setFotosCrupier([foto])
            }, 1000);
        }


        if (valoresSeleccionados[2] !== "ACE") {
            setTimeout(() => {
                const suma = valoresSeleccionados[2]?.Valor + valoresSeleccionados[0]?.Valor
                let valor = {
                    Valor: suma,
                }
                setJugador([valor])

                let foto = {
                    Imagen: valoresSeleccionados[2].Imagen
                }

                setFotosJugador(prevFotos => [...prevFotos, foto])

            }, 2000);
        } else {

            if (Jugador?.Valor + 11 <= 21) {
                let valor = {
                    Valor: valoresSeleccionados[2]?.Valor + 11
                }
                setJugador([valor])

                let foto = {
                    Imagen: valoresSeleccionados[2].Imagen
                }

                setFotosJugador(prevFotos => [...prevFotos, foto])
            } else {
                let valor = {
                    Valor: valoresSeleccionados[2]?.Valor + 1
                }
                setJugador([valor])

                let foto = {
                    Imagen: valoresSeleccionados[2].Imagen
                }

                setFotosJugador(prevFotos => [...prevFotos, foto])
            }
        }


        if (valoresSeleccionados[3] !== "ACE") {
            setTimeout(() => {
                const suma = valoresSeleccionados[3]?.Valor + valoresSeleccionados[1]?.Valor
                let valor = {
                    Valor: suma,
                    ValorIncognito: valoresSeleccionados[1]?.Valor
                }
                setCrupier([valor])

                let foto = {
                    Imagen: valoresSeleccionados[3].Imagen,
                    Id: "Oculto"
                }

                setFotosCrupier(prevFotos => [...prevFotos, foto])
            }, 3000);
        } else {
            if (Crupier + 11 <= 21) {

                let valor = {
                    Valor: valoresSeleccionados[3]?.Valor + 11,
                    ValorIncognito: valoresSeleccionados[1]?.Valor
                }
                setCrupier([valor])

                let foto = {
                    Imagen: valoresSeleccionados[3].Imagen,
                    Id: "Oculto"
                }

                setFotosCrupier(prevFotos => [...prevFotos, foto])
            } else {
                let valor = {
                    Valor: valoresSeleccionados[3]?.Valor + 1,
                    ValorIncognito: valoresSeleccionados[1]?.Valor
                }
                setCrupier([valor])

                let foto = {
                    Imagen: valoresSeleccionados[3].Imagen,
                    Id: "Oculto"
                }

                setFotosCrupier(prevFotos => [...prevFotos, foto])
            }
        }

    }

    console.log(Crupier)
    return (

        <>
            <Header></Header>
            {
                !Mezclar
                    ?
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

                                    <div className='my-16 w-full h-52 flex justify-center items-center flex-col'>
                                        <div className='flex flex-row'>

                                            {FotosCrupier.map((jug) => {
                                                return (
                                                    <div className='flex m-5 flex-row'>
                                                        <img className={jug?.Id ? "flex w-56 h-56 rounded-[10px] absolute" : 'flex w-56 h-56'} src={jug?.Id ? "https://i.pinimg.com/originals/0e/5f/f1/0e5ff160c652d000ebb409a754653d23.jpg" : jug?.Imagen}></img>
                                                        {jug?.Id ? <img className='flex w-56 h-56 rounded-[10px] relative Oculta' src={jug?.Imagen} /> : null}
                                                    </div>
                                                )
                                            })}
                                        </div>



                                        {Crupier.map((cru) => (
                                            <div key={cru?.Valor}>
                                                <h3>{cru?.ValorPrimero || cru?.ValorIncognito}</h3>
                                            </div>
                                        ))}
                                    </div>


                                    <div style={{ bottom: "0" }} className='my-16 absolute w-full h-52 flex justify-center items-center flex-col'>



                                        {Jugador.map((jug) => {
                                            return (
                                                <div >
                                                    <h3>{jug?.Valor}</h3>
                                                </div>
                                            )

                                        })}
                                        <div className='flex flex-row'>
                                            {FotosJugador.map((jug) => {
                                                return (
                                                    <div className='flex m-5'>
                                                        <img className='flex w-56 h-56' src={jug?.Imagen}></img>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                :
                                null

                        }


                    </div>
                    :
                    <h2>Cargando Juego</h2>
            }

        </>
    )
}

export default Blackjack