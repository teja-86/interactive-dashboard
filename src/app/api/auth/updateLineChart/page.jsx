'use client'

import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useState, useEffect } from "react";
import { addWatch } from "@/app/server-actions/addWatch";


function page() {
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


      if(loading) return <div>Loading...</div>
      
  return user ? (
    <div>
      <form action={addWatch} class="mt-28 max-w-md mx-auto bg-white p-6 shadow-md rounded-md space-y-4">
  <div>
    <label htmlFor="month" class="block text-sm font-medium text-gray-700">Month</label>
    <input
      type="text"
      id="month"
      name="month"
      required
      class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
  <div>
    <label htmlFor="paid" class="block text-sm font-medium text-gray-700">Paid</label>
    <input
      type="text"
      id="paid"
      name="paid"
      required
      class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
  <div>
    <label htmlFor="organic" class="block text-sm font-medium text-gray-700">Organic</label>
    <input
      type="text"
      id="organic"
      name="organic"
      required
      class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
  <button
    type="submit"
    class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Add
  </button>
</form>

    </div>
  ) : router.push('/api/auth/signin');
}

export default page