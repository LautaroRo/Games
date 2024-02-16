"use client"
import React, { useState, useEffect } from 'react';
import "./estilos.css"
import { db } from '@/Components/Firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import imagen from "./../../assets/image.gif"
import Link from 'next/link';
const Crearperfil = () => {

    const [Perfiles, setPerfiles] = useState([])
    const [Verificar, setVerificar] = useState(false)
    const [existe, setExiste] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;
        const email = event.target.email.value;
        const image = event.target.image.value;

        for (let i = 0; Perfiles.length > i; i++) {
            const nombre = Perfiles[i].username
            if (nombre === username) {

                setExiste(true)
            }

        }



        try {


            if (existe === true) {
                setVerificar(true)
                await addDoc(collection(db, "usuarios"), {
                    username,
                    password,
                    email,
                    image
                });
            } else {
                console.log("malo")
            }


        } catch (e) {
            console.error(e);
        }
    };

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


    return (
        <div className='flex h-full w-full justify-center' style={{
            background: `url(${imagen.src})`,
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
                    <li className='mx-5 cursor-pointer shadowli'>
                        <Link href={"/"}>
                            Volver
                        </Link>

                    </li>

                    <li className='mx-5 cursor-pointer shadowli'>

                        <Link href={"/IniciarMap"}>
                            Iniciar Sesion
                        </Link>

                    </li>
                </ul>
            </nav>
            {
                !Verificar

                    ?
                    <form className='flex flex-col justify-center w-full items-center ' onSubmit={handleSubmit}>
                        <input required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' type='text' name='username' placeholder='Nombre de Usuario'></input>
                        <input required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' type="password" name='password' placeholder='Contraseña'></input>
                        <input required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' type="email" name='email' placeholder='Email'></input>
                        <input className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' type="text" name='image' placeholder='Imagen'></input>
                        <button className='m-6 rounded-lg p-3 bg-blue-500 text-white' type='submit'>Enviar</button>
                    </form>
                    :

                    null
            }

        </div>
    );
};

export default Crearperfil;