'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaGoogle  } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';



export default function page() {

    const supabase = createClientComponentClient();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser() {
            const {data : {user}} = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
    }
    getUser();
}, []);


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const router = useRouter();


    const handleFormInputChange = (e) => {
        const { id, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }))

        if (id === 'email') setEmailError('');
        if (id === 'password') setPasswordError('');
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
      
        setEmailError('');
        setPasswordError('');
        setGeneralError('');
      
        if (!formData.email) {
          setEmailError('Email is required');
        }
        if (!formData.password) {
          setPasswordError('Password is required');
        }
      
        if (formData.email && formData.password) {
            try {
                // Your async logic here
                const {error : signUpError} = await supabase.auth.signUp({
                    email : formData.email,
                    password : formData.password,
                    options : {
                        emailRedirectTo : 'http://localhost:3000/',
                    }
                })

                if(signUpError) {
                    setGeneralError(signUpError.message);
                    console.log('could not sign up', signUpError);
                    
                }
                else {
                    router.push('/api/auth/signin');
                }
            } catch (error) {
                console.log(error);
                setGeneralError('An error creating your account. Please try again.');
                
            }
        }
    };
      


    const handleGoogleSignIn = async () => {
       console.log('google sign in')
    };

    if(loading) return <div>Loading...</div>
    if(user) router.push('/');

  return !user ? (
    <section>
        <div className="px-8 py-16 mx-auto md:px-12 lg:px-32 max-w-7xl ">
            <div className="max-w-md mx-auto md:max-w-sm md:w-96">
                <div className="flex flex-col cursor-default">
                    <h1 className="text-3xl font-semibold tracking-tighter text-gray-900">
                    Interactive
                    <span className="text-gray-600">Dashboard</span>
                    </h1>
                    <p className="mt-2 text-base font-medium text-gray-500">
                        Create a new account
                    </p>
                </div>
                <div className="pt-10">
                   
                    
                </div>
                <form className="mt-4" onSubmit={handleFormSubmit}>
                    <div className="space-y-3">
                        <label className="block mb-3 text-sm font-medium text-gray-600">Email</label>
                    <div>
                        <input
                            type="text"
                            id="email"
                            className={`block w-full px-[16px] py-[8px] bg-gray-50  text-black duration-200 border rounded-md appearance-none bg-chalk border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 text-sm leading-tight ${emailError ? 'border-red-700' : ''}`}
                            onChange={handleFormInputChange}
                            value={formData.email}
                            style={{borderColor: emailError ? 'darkred' : ''}}
                        />
                        {emailError && <p className="mt-2 text-sm font-medium text-red-700">{emailError}</p>}
                    </div>
                    <div className="col-span-full">
                            <label className="block mb-3 text-sm font-medium text-gray-600" >
                                Password
                            </label>
                        <input
                        id="password"
                        className={`block w-full px-[16px] py-[8px] bg-gray-50  text-black duration-200 border rounded-md appearance-none bg-chalk border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 text-sm leading-tight ${emailError ? 'border-red-700' : ''}`}
                        type="password"
                        onChange={handleFormInputChange}
                        value={formData.password}
                        style={{borderColor: passwordError ? 'darkred' : ''}}

                        />
                            {passwordError && <p className="mt-2 text-sm font-medium text-red-700">{passwordError}</p>}
                    </div>
                    
                    <div className="col-span-full">
                        <button className="inline-flex text-sm items-center mt-4 justify-center w-full gap-3 px-[16px] py-[8px] font-medium text-white duration-200 bg-blue-600 rounded-md hover:bg-blue-400" >
                        Create your account
                        </button>
                    </div>
                    {generalError && <p className="mt-2 text-sm font-medium text-red-700">{generalError}</p>}
                    </div>
                </form>
                
                <div className="mt-6">
                    <p className="text-sm leading-tight text-center text-gray-600">
                        Have an account?
                        <Link
                            className="ml-2 underline leading-tight text-sm text-black"
                            href="/api/auth/signin"
                        >
                        Sign in now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </section>

  ) : router.push('/');
}