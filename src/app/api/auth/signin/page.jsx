'use client'

import React, { useState , useEffect} from 'react'
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
    const router = useRouter()

    const handleFormInputChange = (e) => {
        const { id, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }))

        if (id === 'email') {
            setEmailError('');
            setGeneralError('');
        };
        if (id === 'password') {
            setPasswordError('');
            setGeneralError('');
        };
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (formData.email === '') setEmailError('Email is required') 
        if (formData.password === '') setPasswordError('Password is required') 

        if (formData.email && formData.password) {
                // Your async logic here
                const {error : signInError} = await supabase.auth.signInWithPassword({
                    email : formData.email,
                    password : formData.password,
                    
                })

                if(signInError) {
                   if(signInError.message === 'Invalid login credentials') {
                        setGeneralError('Invalid credentials. Please try again.');
                   }
                   else {
                    setGeneralError("Error signing in. Please try again."); 
                    console.log(signInError);
                   }
                    
                }
                else {
                    router.push('/');
                }
        }
    }

    const handleGoogleSignIn = async () => {
       console.log('google sign in')
    };

    if(loading) return <div>Loading...</div>
    if(user) router.push('/');


    return !user ? (
    <section>
        <div className="px-8 py-16 mx-auto md:px-12 lg:px-32 max-w-7xl ">
            <div className="max-w-md mx-auto md:max-w-sm md:w-96">
                <div className="flex flex-col  cursor-default">
                    <h1 className="text-3xl font-semibold tracking-tighter text-gray-900">
                    Interactive
                    <span className="text-gray-600">Dashboard</span>
                    </h1>
                    <p className="mt-2 text-base font-medium text-gray-500">
                        Sign in to your account!
                    </p>
                </div>
                <div className="pt-10">
                    <div className='flex flex-col gap-3 mt-2'>
                    
                    </div>
                   
                </div>
                <form className="mt-4" onSubmit={handleFormSubmit}>
                    <div className="space-y-3">
                        <label className="block mb-3 text-sm font-medium text-gray-600" > Email </label>
                    <div>
                        <input
                        type="text"
                        id="email"
                        className={`block w-full px-[16px] py-[8px] bg-gray-50  text-black duration-200 border rounded-md appearance-none bg-chalk border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 text-sm leading-tight ${emailError ? 'border-red-700' : ''}`}
                        onChange={handleFormInputChange}
                        value={formData.email}
                        />
                        {emailError && <p className="mt-2 text-sm font-medium text-red-700">{emailError}</p>}
                    </div>
                    <div className="col-span-full">
                        <div className='flex justify-between'>
                            <label className="block mb-3 text-sm font-medium text-gray-600" >
                                Password
                            </label>
                            <Link href="#" className='mb-3 block text-sm font-medium leading-tight text-gray-500'>
                                forgot password?
                            </Link>
                        </div>
                        <input
                        id="password"
                        className={`block w-full px-[16px] py-[8px] bg-gray-50  text-black duration-200 border rounded-md appearance-none bg-chalk border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 text-sm leading-tight ${emailError ? 'border-red-700' : ''}`}
                        type="password"
                        // placeholder='Password'
                        onChange={handleFormInputChange}
                        value={formData.password}
                        />
                        {passwordError && <p className="mt-2 text-sm font-medium text-red-700">{passwordError}</p>}
                    </div>
                    
                    <div className="col-span-full">
                        <button className="inline-flex text-sm items-center mt-4 justify-center w-full gap-3 px-[16px] py-[8px] font-medium text-white duration-200 bg-blue-600 rounded-md hover:bg-blue-400" >
                            Sign In
                        </button>
                    </div>
                    {generalError && <p className="mt-2 text-sm font-medium text-red-700">{generalError}</p>}
                    </div>
                </form>
                
                <div className="mt-6">
                    <p className="text-sm leading-tight text-center text-gray-600">
                        Dont have an account?
                        <Link
                            className="ml-2 underline leading-tight text-sm text-black"
                            href="/api/auth/signup"
                        >
                        Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </section>
    ): router.push('/');
}



