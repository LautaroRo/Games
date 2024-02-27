"use client"
import React, { useEffect, useState } from 'react';
import "./../Crearperfil/estilos.css"
import Link from 'next/link';
import imagentwo from "./../../assets/imagetwo.gif"
import { db } from '@/Components/Firebase/config';
import { collection, getDocs } from 'firebase/firestore';


const IniciarSesion = () => {

    const [Perfiles, setPerfiles] = useState(null)
    const [Firebase, setFirebase] = useState([])
    
    const Filtrar = (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        const filtrados = Firebase.find(element => element.email == email)


        if(filtrados.password === password){
            setPerfiles(filtrados)
            localStorage.setItem("userCredencial", JSON.stringify(filtrados))
        }else{
            console.log("error")
        }
    }
    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {


                
                const traidos = localStorage.getItem("userCredencial")
                const parseados = JSON.parse(traidos)

                setPerfiles(parseados)

                const query = await getDocs(collection(db, "usuarios"))
                const usuarios = query.docs.map(doc => doc.data())

                setFirebase(usuarios)

            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        obtenerUsuarios();
    }, []);

    const vaciar = (e) => {
        e.preventDefault()

        localStorage.removeItem("userCredencial")
        setPerfiles([])
    }

    return (
        <div className='flex h-full w-full justify-center' style={{
            background: `url(${imagentwo.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: "1"
        }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            />


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
                Perfiles

                    ?
                    <>


                        <div className='flex justify-center flex-col items-center' style={{ zIndex: "100" }}>
                            <img style={{ borderRadius: "100%" }} className='h-[200px] w-[200px]' src={Perfiles.url}></img>
                            <h1 className='my-8'>{Perfiles.username}</h1>
                            <button onClick={vaciar}>Cerrar Sesion</button>
                        </div>

                    </>
                    :
                    <form className='flex flex-col justify-center w-full items-center' style={{zIndex: "100"}} onSubmit={Filtrar}>
                        <input required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' type="email" name='email' placeholder='Nombre de Usuario'></input>
                        <input required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' type="password" name='password' placeholder='Contraseña'></input>
                        <button className='m-6 rounded-lg p-3 bg-blue-500 text-white' type='submit'>Inciar</button>
                    </form>

            }



        </div>
    )
}

export default IniciarSesion