"use client"
import React, { useEffect, useState } from 'react'
import "./estilos.css"
import Header from '@/Components/Header'
import { cartas } from '../ApiBlackjack'

const Blackjack = () => {



    const [Crupier, setCrupier] = useState([])
    const [Jugador, setJugador] = useState([])
    const [FotosJugador, setFotosJugador] = useState([])
    const [FotosCrupier, setFotosCrupier] = useState([])
    const [Start, setStart] = useState(false)
    const [Cartas, setCartas] = useState([])
    const [Mezclar, setMezclar] = useState(true)
    const [Decision, setDecision] = useState(false)
    const [Blackjack, setBlackJack] = useState(false)
    
    const TraerCartas = async () => {
        
        try {
            const cartasConst = await fetch(cartas)
            const cartasjson = await cartasConst.json()

            console.log(cartasjson)
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


    useEffect(() => {
        setTimeout(() => {
            setMezclar(false)

        }, 2500);

        TraerCartas()
    }, [])




    const Random = (e) => {
        e.preventDefault()
        const indiceAleatorio = Math.floor(Math.random() * Cartas.length);
        const carta = Cartas[indiceAleatorio];


        if (carta?.Valor === "King" || carta?.Valor === "JACK" || carta?.Valor === "QUEEN") {
            const suma = Jugador[0]?.Valor + 10

            let info = {
                Valor: suma,
            }
            setJugador([info])
        
            let foto = {
                Imagen: carta?.Imagen
            }
            setFotosJugador([...FotosJugador, foto])
        }

        if (typeof carta?.Valor === 'number') {
            const suma = Jugador[0]?.Valor + carta?.Valor


            let info = {
                Valor: suma,
            }
            setJugador([info])
            let foto = {
                Imagen: carta?.Imagen
            }
            setFotosJugador([...FotosJugador, foto])
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

                let valor = {
                    Tipo: "ACE",
                    Imagen: carta?.Imagen
                }
                valoresSeleccionados.push(valor)
            }
        }



        if (valoresSeleccionados[0]?.Tipo !== "ACE") {

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


        if (valoresSeleccionados[1]?.Tipo !== "ACE") {
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


        if (valoresSeleccionados[2]?.Tipo !== "ACE") {
            setTimeout(() => {
                if (valoresSeleccionados[0]?.Tipo !== "ACE") {
                    const suma = valoresSeleccionados[2]?.Valor + valoresSeleccionados[0]?.Valor;
                    let valor = {
                        Valor: suma,
                    }
                    setJugador([valor])

                    let foto = {
                        Imagen: valoresSeleccionados[2].Imagen
                    }

                    setFotosJugador(prevFotos => [...prevFotos, foto])
                } else {
                    const suma = valoresSeleccionados[2]?.Valor + 11;
            
                    let valor = {
                        Valor: suma,
                    }
                    setJugador([valor])

                    let foto = {
                        Imagen: valoresSeleccionados[2].Imagen
                    }

                    setFotosJugador(prevFotos => [...prevFotos, foto])
                }
            }, 2000);
        } else {
            if (valoresSeleccionados[0]?.Valor !== "ACE") {

                const suma = valoresSeleccionados[0]?.Valor + 11;
                let valor = {
                    Valor: suma
                }
                setJugador([valor])

                let foto = {
                    Imagen: valoresSeleccionados[2].Imagen
                }

                setFotosJugador(prevFotos => [...prevFotos, foto])

            } else {

                const suma = Jugador[0]?.Valor + 1;
                let valor = {
                    Valor: suma
                }
                setJugador([valor])

                let foto = {
                    Imagen: valoresSeleccionados[2].Imagen
                }

                setFotosJugador(prevFotos => [...prevFotos, foto])


            }
        }

        if (valoresSeleccionados[3]?.Tipo !== "ACE") {
            setTimeout(() => {

                if(valoresSeleccionados[1] !== "ACE"){
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
                }else{
                    const suma = valoresSeleccionados[3]?.Valor + 11
                    let valor = {
                        Valor: suma,
                        ValorIncognito: 11
                    }
                    setCrupier([valor])
    
                    let foto = {
                        Imagen: valoresSeleccionados[3].Imagen,
                        Id: "Oculto"
                    }
    
                    setFotosCrupier(prevFotos => [...prevFotos, foto])
                }


            }, 3000);
        } else {
            if (valoresSeleccionados[1] !== "ACE") {

                const suma = valoresSeleccionados[1]?.Valor + 11
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
            } else {
                let valor = {
                    Valor: 12,
                    ValorIncognito: 11
                }
                setCrupier([valor])

                let foto = {
                    Imagen: valoresSeleccionados[3].Imagen,
                    Id: "Oculto"
                }

                setFotosCrupier(prevFotos => [...prevFotos, foto])
            }
        }

        if (valoresSeleccionados[0]?.Valor + valoresSeleccionados[2]?.Valor === 21) {
            setBlackJack(true)
        } else {
            setTimeout(() => {
                setDecision(true)
            }, 4000);

        }

    }
    console.log(Jugador[0]?.Valor,Jugador[1]?.Valor)

    return (

        <>

            <Header></Header>
            {
                !Mezclar && Cartas.length > 0
                    ?
                    <div className='flex flex-col justify-center items-center' style={{
                        background: "url(https://i.pinimg.com/originals/fc/98/0b/fc980b6ec648175e3c8ac9e9f1ed57f2.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "100vh",
                        position: "fixed",
                        top: "0"
                    }}>
                        <div className={Start ? "hidden" : 'flex items-center w-full justify-center'}>
                            <button className='flex w-48 h-16 bg-green-200 justify-center items-center' style={{ color: "black", borderRadius: "30px" }} onClick={Comenzar}>Jugar</button>
                        </div>


                        {
                            Start === true
                                ?

                                <div className='flex flex-col w-full items-center h-[65vh]'>

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




                                    {!Decision

                                        ?

                                        null

                                        :

                                        <div>
                                            <button onClick={Random}>+</button><h2>-</h2>
                                        </div>
                                    }

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