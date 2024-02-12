const API = "https://api.themoviedb.org/3";
const API_KEY = "4903e5c5c2225bad56aa53c4f91fd74b";

const ObtenerApiMemoria = async () => {

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

    return {MejoresPeliculas}
}

export default ObtenerApiMemoria