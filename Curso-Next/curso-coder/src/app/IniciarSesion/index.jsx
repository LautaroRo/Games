"use client"
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/Components/Firebase/config';
import React, { useEffect, useState } from 'react';
import "./../Crearperfil/estilos.css"
import Link from 'next/link';
import imagentwo from "./../../assets/imagetwo.gif"


const IniciarSesion = () => {

    const [Perfiles, setPerfiles] = useState([])
    const [PerfilEncontrado, setPerfilEncontrado] = useState([])

    const Filtrar = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value


        let info = []
        for (let i = 0; Perfiles.length > i; i++) {
            if (username === Perfiles[i].username && password === Perfiles[i].password) {

                let valores = {
                    username: username,
                    password: password
                }

                info.push(valores)
            
                localStorage.setItem("Perfil-Login", JSON.stringify(info));
            } else {
                console.log("No encontrado")
            }
        }

        setPerfilEncontrado(info)
    }


    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'usuarios'));
                let info = []
                querySnapshot.forEach((doc) => {
                    info.push(doc.data())
                });
                setPerfiles(info)
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        obtenerUsuarios();
    }, []);

    console.log(PerfilEncontrado)

    return (
        <div className='flex h-full w-full justify-center' style={{
            background: `url(${imagentwo.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>

            <nav className='h-10 w-full fixed top-0 p-12'>
                <ul style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <li className='mx-5 cursor-pointer shadowlitwo'>
                        <Link href={"/"}>
                            Volver
                        </Link>

                    </li>

                    <li className='mx-5 cursor-pointer shadowlitwo'>

                        <Link href={"/CrearMap"}>
                            Crear Perfil
                        </Link>

                    </li>
                </ul>
            </nav>

            {
                PerfilEncontrado.length > 0

                    ?
                        <>
                            {PerfilEncontrado.map((Perfil)=>{
                                return(
                                    <div className='flex justify-center'>
                                        <h2>Hola de nuevo  {Perfil.username}!!!!!!</h2>
                                    </div>
                                )
                            })}
                        </>
                    :
                    <form className='flex flex-col justify-center w-full items-center' onSubmit={Filtrar}>
                        <input required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' type='text' name='username' placeholder='Nombre de Usuario'></input>
                        <input required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' type="password" name='password' placeholder='Contraseña'></input>
                        <button className='m-6 rounded-lg p-3 bg-blue-500 text-white' type='submit'>Inciar</button>
                    </form>

            }



        </div>
    )
}

export default IniciarSesion