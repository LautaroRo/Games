import React from 'react'
import ObtenerApiMemoria from '../ApiMemoria'
const page = async() => {


    const {MejoresPeliculas} = await ObtenerApiMemoria()

    console.log(MejoresPeliculas)
    return (
        <div>page</div>
    )
}

export default page