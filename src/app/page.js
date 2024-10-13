'use client'

import Charts from "@/components/Charts";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);
  const [loading , setloading] = useState(true);
  const router = useRouter();


    useEffect(() => {
      async function getUser() {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setloading(false);
      }
      getUser();
    }, []);
    
    const handleLogout = async () => {
      try {
        await supabase.auth.signOut();
      router.push('/api/auth/signin');
      } catch (error) {
          console.log(error.message);
          
      }
    }

    if(loading) return <div>Loading...</div>

    console.log(user);
    

  return user ? (
    <>
      <div className="flex">

        <Sidebar/>
        <main className="flex-grow ml-64 relative">
          <Navbar handleLogout = {handleLogout}/>
        
          <Charts/>
        </main>
      </div> 
    </>
  ) : router.push('/api/auth/signin');
}
