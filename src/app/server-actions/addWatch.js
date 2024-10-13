'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export async function addWatch(formData) {
    const month = formData.get('month');
    const paid = formData.get('paid');
    const organic = formData.get('organic');

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies : () => cookieStore});
    const {data : {session}} = await supabase.auth.getSession();
    const user = session?.user;

    if(!user)  {
        console.error("user not found");
        return;
    }

    const {data, error} = await supabase.from('watch').insert([{month, paid, organic, user_id: user.id}]);

    if(error) {
        console.error(error);
        return;
    }

    // revalidatePath('/');
    

    return {message : 'Success'}

}