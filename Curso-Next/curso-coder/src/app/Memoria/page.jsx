"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import "./estilos.css"

const Title = () => {

    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";
    const [Movies, setMovies] = useState([])
    const [Valor, setValor] = useState([])
    const [Count, setCount] = useState(1)
    const [Guardado, setGuardado] = useState()


    useEffect(() => {
        const traerTodasPeliculas = async () => {
            let MejoresPeliculas = []

            const numero = Math.floor(Math.random() * 10) + 1


            let urlMejoresPeliculas = `${API}/movie/top_rated?api_key=${API_KEY}&page=${numero}`;
            const responseMejoresPeliculas = await fetch(urlMejoresPeliculas)
            const dataMejoresPeliculas = await responseMejoresPeliculas.json()

            for (let j = 0; 6 > j; j++) {
                let img = dataMejoresPeliculas.results[j].poster_path

                const Imagenes = `https://image.tmdb.org/t/p/original${img}`;
                const name = dataMejoresPeliculas.results[j].title

                let info = {
                    Nombre: name,
                    Foto: Imagenes,
                }

                MejoresPeliculas.push(info)
            }

            setMovies(MejoresPeliculas)
        }
        traerTodasPeliculas()
    }, [])



    useEffect(() => {
        setValor([])

        const informacionDuplicada = Movies.concat(Movies);

        const shuffledCards = informacionDuplicada.map((element) => ({
            ...element,
            id: Date.now() + Math.floor(Math.random() * 9943),
            id2: Date.now() + Math.floor(Math.random() * 9943)
        })).sort(() => Math.random() - 0.5);

        setValor(shuffledCards);

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

            setTimeout(() => {
                if (Count === 2 && String(Guardado?.Nombre) === String(elementoFiltrado?.Nombre)) {

                    if (e?.target && DivFoto) {
                        e?.target?.classList?.add("Finish2");
                        DivFoto?.classList?.add("Finish");
                        DivFoto2?.classList?.add("Finish");
                        setGuardado(null)
                        setCount(1);
                    }
                }

                else if (Count === 2 && String(Guardado?.Nombre) !== String(elementoFiltrado?.Nombre)) {
                    cartaMover?.forEach((carta) => {
                        carta.classList.remove("Resolver2");
                    });

                    cardaVolver?.forEach((carta) => {
                        carta.classList.remove("Resolver");
                    });

                    setCount(1);

                }

            }, 2000);
            
        } else {
            console.log("No")
        }


    };



    return (

        <div className='flex flex-wrap flex-row w-full align-middle justify-center h-full'>
            {
                Valor?.length > 0 && Valor.length < 20
                    ?
                    <>
                        {Valor.map((Personaje) => {
                            return (
                                <div className='flex align-middle CardGeneral '>
                                    <div id={Personaje?.id} name={Personaje?.Nombre} onClick={DarVuelta} className='bg-white w-[200px] h-[250px] m-6 relative card'>

                                    </div>

                                    <Image src={Personaje?.Foto} width={200} height={250} alt={Personaje?.Nombre} id={Personaje?.id2} className='flex justify-center m-6 absolute cartaDevuelta' />

                                </div>
                            )
                        })}

                    </>
                    :
                    null
            }


        </div>
    )
}

export default Title