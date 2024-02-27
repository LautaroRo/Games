"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import "./estilos.css"
import ObtenerApiMemoria from '../../app/ApiMemoria'

const Title = () => {

    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";
    const [Movies, setMovies] = useState([])
    const [Valor, setValor] = useState([])
    const [Count, setCount] = useState(1)
    const [Guardado, setGuardado] = useState()
    const [Mezclar, setMezclar] = useState(true)
    const [Activar, setActivar] = useState(false)
    const [SegundoCount, setSegundoCount] = useState(0)



    const traerTodasPeliculas = async () => {
        const carts = document.querySelectorAll(".Finish");
        const carts2 = document.querySelectorAll(".Finish2");
        const carts3 = document.querySelectorAll(".Resolver");
        const carts4 = document.querySelectorAll(".Resolver2");
        carts.forEach(cart => {
            cart.classList.remove("Finish");
        });


        carts2.forEach(cart => {
            cart.classList.remove("Finish2");
        });


        carts3.forEach(cart => {
            cart.classList.remove("Resolver");
        });


        carts4.forEach(cart => {
            cart.classList.remove("Resolver2");
        });


        setActivar(false)

        const { MejoresPeliculas } = await ObtenerApiMemoria()


        setMovies(MejoresPeliculas)

    }

    useEffect(() => {

        traerTodasPeliculas()

        setTimeout(() => {
            setMezclar(false)
        }, 3000);
    }, [])



    const mezclar = () => {
        setValor([])

        const informacionDuplicada = Movies.concat(Movies);

        const shuffledCards = informacionDuplicada.map((element) => ({
            ...element,
            id: Date.now() + Math.floor(Math.random() * 9943),
            id2: Date.now() + Math.floor(Math.random() * 9943)
        })).sort(() => Math.random() - 0.5);

        setValor(shuffledCards);
    }


    useEffect(() => {
        mezclar()
    }, [Movies])





    const DarVuelta = (e) => {
        e.preventDefault()

        if (Count < 3) {
            setCount((prevCount) => prevCount + 1)

            const elementoFiltrado = Valor.find((valor) => String(valor.id) === e.target.id);

            const DivFoto = document.getElementById(elementoFiltrado?.id2);
            const DivFoto2 = document.getElementById(Guardado?.id2)
            const cartaMover = document.querySelectorAll(".card");
            const cardaVolver = document.querySelectorAll(".cartaDevuelta");


            if (Count === 1) {
                setGuardado(elementoFiltrado)
            }

            if (Count <= 2) {
                e.target?.classList?.add("Resolver2");
                DivFoto?.classList?.add("Resolver");
            }


            if (Count === 2 && String(Guardado?.Nombre) === String(elementoFiltrado?.Nombre)) {

                if (e?.target && DivFoto) {
                    e?.target?.classList?.add("Finish2");
                    DivFoto?.classList?.add("Finish");
                    DivFoto2?.classList?.add("Finish");
                    setGuardado(null)
                    setCount(1);
                    setSegundoCount(prevCount => prevCount + 1)

                }
            }
            setTimeout(() => {
                if (Count === 2 && String(Guardado?.Nombre) !== String(elementoFiltrado?.Nombre)) {
                    cartaMover?.forEach((carta) => {
                        carta.classList.remove("Resolver2");
                    });

                    cardaVolver?.forEach((carta) => {
                        carta.classList.remove("Resolver");
                    });

                    setCount(1);

                }

            }, 1000);


        } else {
            console.log("No")
        }


    };

    useEffect(() => {
        console.log(SegundoCount)
        if (SegundoCount % 6 === 0 && SegundoCount !== 0) {
            setActivar(true)
            setSegundoCount(0)
        }
    }, [SegundoCount])
    return (
        <>

            <div className='flex flex-wrap flex-row w-full align-middle justify-center h-full'>
                {
                    Valor?.length > 0 && Valor.length < 20 && !Mezclar
                        ?
                        <>
                            {Valor.map((Personaje, key) => {
                                return (
                                    <div key={key} className='flex align-middle CardGeneral '>
                                        <div id={Personaje?.id} name={Personaje?.Nombre} onClick={DarVuelta} className='bg-white w-[200px] h-[250px] m-6 relative card'>

                                        </div>

                                        <Image src={Personaje?.Foto} width={200} height={250} alt={Personaje?.Nombre} id={Personaje?.id2} className='flex justify-center m-6 absolute cartaDevuelta' />

                                    </div>
                                )
                            })}

                        </>
                        :
                        <div>Mezclando Cartas</div>
                }

                {
                    !Mezclar && Activar
                        ?
                        <button onClick={traerTodasPeliculas}>Jugar de nuevo?</button>
                        :
                        null
                }
            </div>
        </>
    )

}

export default Title