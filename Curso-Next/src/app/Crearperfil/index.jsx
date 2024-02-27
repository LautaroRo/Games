"use client"
import React, { useState, useEffect } from 'react';
import { auth } from '@/Components/Firebase/config';
import { db } from '@/Components/Firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./estilos.css"
import imagen from "./../../assets/image.gif"
import Link from 'next/link';


const Crearperfil = () => {

    const [values, setValues] = useState({ email: '', password: '', username: "", url: "" });
    const [Firebase, setFirebase] = useState([])
    const [Form, setForm] = useState(false)
    const [Verificacion, setVerificacion] = useState(false)

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const query = await getDocs(collection(db, "usuarios"))
                const usuarios = query.docs.map(doc => doc.data())
                setFirebase(usuarios)
            } catch {
                console.log("error")
            }
        }

        obtenerUsuarios()
    }, [])
    useEffect(() => {
        if (Verificacion === true) {
            const confirmarUsuario = async () => {

                await createUserWithEmailAndPassword(auth, values.email, values.password);

                await addDoc(collection(db, "usuarios"), {
                    username: values.username,
                    password: values.password,
                    email: values.email,
                    url: values.url
                });

                localStorage.setItem("userCredencial", JSON.stringify(values))
                setForm(true);
            }

            confirmarUsuario()
        }

    }, [Verificacion, values])

    const registerUser = async () => {


        const filter = Firebase.find(element => element.email == values.email)

        if(filter === undefined){
            setVerificacion(true)
        }

    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        e.target.email.value = ""
        e.target.password.value = ""
        e.target.username.value = ""
        e.target.url.value = ""
        await registerUser();

    };



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
                !Form
                    ?
                    <form className='flex flex-col justify-center w-full items-center' onSubmit={handleSubmit}>
                        <input value={values.email} required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' type="email" name='email' placeholder='Email' onChange={handleChange}></input>
                        <input value={values.username} required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' name='username' placeholder='Username' onChange={handleChange}></input>
                        <input value={values.url} required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' name='url' placeholder='urlImagen' onChange={handleChange}></input>
                        <input value={values.password} required className='m-6 rounded-lg p-3 outline-none w-[20%] text-black' type="password" name='password' placeholder='Contraseña' onChange={handleChange}></input>
                        <button className='m-6 rounded-lg p-3 bg-blue-500 text-white' type='submit'>Enviar</button>
                    </form>
                    :
                    <>
                        <div className='flex justify-center items-center'>
                            <img style={{ borderRadius: "100%", height: "15em", width: "15em" }} src={values?.url}></img>
                            <h1>{values?.username}</h1>
                        </div>
                    </>
            }

        </div>
    );
};

export default Crearperfil;