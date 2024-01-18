"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Title = () => {

    const API = "https://api.themoviedb.org/3";
    const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";
    const [Movies, setMovies] = useState([])
    const [Valor, setValor] = useState([])

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
            id:  Date.now() + Math.floor(Math.random() * 9943),
            id2: Date.now() + Math.floor(Math.random() * 9943)
        })).sort(() => Math.random() - 0.5);

        setValor(shuffledCards);

    }, [Movies])


    const DarVuelta = (e) => {
        e.preventDefault()

        const idClickeado = e.target.id;


        const elementoFiltrado = Valor.find((valor) => String(valor.id) === idClickeado);
        const DivFoto = document.getElementById(elementoFiltrado?.id2)
        console.log(DivFoto)
        e.target?.classList?.add("Resolver2")
        DivFoto?.classList?.add("Resolver")
    }
    return (

        <div className='flex flex-wrap flex-row w-full align-middle justify-center h-full'>
            {
                Valor?.length > 0 && Valor.length < 20
                    ?
                    <>
                        {Valor.map((Personaje) => {
                            return (
                                <div className='flex align-middle CardGeneral'>
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