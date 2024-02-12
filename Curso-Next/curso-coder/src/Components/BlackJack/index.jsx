"use client"
import React, { useEffect, useState } from 'react'
import "./estilos.css"


const Blackjack = ({ cartas }) => {
    const [Crupier, setCrupier] = useState([])
    const [Jugador, setJugador] = useState([])
    const [FotosJugador, setFotosJugador] = useState([])
    const [FotosCrupier, setFotosCrupier] = useState([])
    const [Start, setStart] = useState(false)
    const [Cartas, setCartas] = useState([])
    const [Mezclar, setMezclar] = useState(true)
    const [Decision, setDecision] = useState(false)
    const [BlackjackGame, setBlackJack] = useState(false)
    const [Mostrar, setMostrar] = useState(false)
    const [Inflexion, setInflexion] = useState(false)

    const TraerCartas = async () => {

        try {
            setCartas(cartas)

        }
        catch {
            console.log(error)
        }

    }





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
                    ValorIncognito: valoresSeleccionados[1]?.Valor,
                    Valor: valoresSeleccionados[1]?.Valor
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
                    ValorIncognito: 11,
                    Valor: 11
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
                console.log(valoresSeleccionados[1])
                if (valoresSeleccionados[1].Tipo !== "ACE") {
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
                } else {
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
            if (valoresSeleccionados[1].Tipo !== "ACE") {

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

        if (valoresSeleccionados[0]?.Valor + valoresSeleccionados[2]?.Valor !== 21) {
            setTimeout(() => {
                setDecision(true)
            }, 4000);

        }
    }
    useEffect(() => {

        setTimeout(() => {
            setMezclar(false)

        }, 2500);

        TraerCartas()
    }, [])


    const TurnoDeCrupier = (e) => {
        e?.preventDefault()
        setTimeout(() => {
            const indiceAleatorio = Math.floor(Math.random() * Cartas.length);
            const carta = Cartas[indiceAleatorio];

            if (carta?.Valor === "King" || carta?.Valor === "JACK" || carta?.Valor === "QUEEN") {
                const suma = Crupier[0]?.Valor + 10;

                const nuevaCartaCrupier = { Valor: suma };

                const nuevaImagenCrupier = { Imagen: carta?.Imagen };

                setCrupier([nuevaCartaCrupier]);

                setFotosCrupier([...FotosCrupier, nuevaImagenCrupier]);

            } else if (carta?.Valor === "Ace") {

                let valorAs = 11;

                const totalCrupier = Crupier.reduce((total, carta) => total + (typeof carta.Valor === 'number' ? carta.Valor : 0), 0);

                if (totalCrupier + valorAs > 21) {

                    valorAs = 1;
                }
                const suma = Crupier[0]?.Valor + valorAs;

                const nuevaCartaCrupier = { Valor: suma };

                const nuevaImagenCrupier = { Imagen: carta?.Imagen };

                setCrupier([nuevaCartaCrupier]);

                setFotosCrupier([...FotosCrupier, nuevaImagenCrupier]);
            } else if (typeof carta?.Valor === 'number') {

                const suma = Crupier[0]?.Valor + carta?.Valor;

                const nuevaCartaCrupier = { Valor: suma };

                const nuevaImagenCrupier = { Imagen: carta?.Imagen };

                setCrupier([nuevaCartaCrupier]);

                setFotosCrupier([...FotosCrupier, nuevaImagenCrupier]);
            }
        }, 1000);
    }



    const Plantar = () => {
        try {
            setDecision(false)
            setMostrar(true)

            console.log(Crupier[0].Valor)
            for (let i = 0; FotosCrupier.length > i; i++) {
                delete FotosCrupier[i].Id;
            }
            if (Crupier[0].Valor < 17) {
                TurnoDeCrupier();
            } else {
                console.log(false);
            }
        } catch {
            console.log("error")
        }


    }

    const verificar = () => {

        if (Jugador[0]?.Valor < Crupier[0]?.Valor && Crupier[0]?.Valor < 22) {
            console.log("Perdiste")
        }

        else if (Jugador[0]?.Valor > Crupier[0]?.Valor && Jugador[0]?.Valor < 22) {
            console.log("Ganaste")
        }

        else if (Jugador[0]?.Valor === Crupier[0]?.Valor) {
            console.log("Empate")
        }

        else if (Jugador[0]?.Valor > Crupier[0]?.Valor && Jugador[0]?.Valor >= 22) {
            console.log("Perdiste")
        }

        else if (Jugador[0]?.Valor < Crupier[0]?.Valor && Crupier[0]?.Valor >= 22) {
            console.log("Ganaste")
        }
        else if( Jugador[0]?.Valor > 21 ){
            console.log("Perdiste")
        }
    }


    useEffect(() => {

        if (Mostrar && Crupier[0]?.Valor < 17 && !Decision) {
            TurnoDeCrupier()
        }
        else if (Crupier[0]?.Valor >= 17 && Mostrar && !Decision) {
            setInflexion(true)

        }



    }, [Crupier])

    useEffect(() => {

        if (Crupier[0]?.Valor > 16 && Inflexion) {
            setBlackJack(true)
        }
    }, [Inflexion])
    useEffect(() => {

        if (Jugador[0]?.Valor > 20) {
            setDecision(false)
            setTimeout(() => {
                Plantar()
            }, 1000);

        }

    }, [Jugador])


    useEffect(() => {
        if (BlackjackGame) {
            verificar()
        }

    }, [BlackjackGame])

    return (

        <>

            {
                !Mezclar && Cartas?.length > 0
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
                                                <h3>{Mostrar ? cru?.Valor : cru?.ValorIncognito}</h3>
                                            </div>
                                        ))}
                                    </div>




                                    {Decision

                                        ?

                                        <div>
                                            <button onClick={Random}>+</button><h2 onClick={Plantar}>-</h2>
                                        </div>

                                        :

                                        null
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