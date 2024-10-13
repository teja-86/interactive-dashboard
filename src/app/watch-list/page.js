import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";


export default async function WatchList() { 
    const cokkieStore = cookies();
    const supabase = createServerComponentClient({cookies : () => cokkieStore});
    const {data : {session}} = await supabase.auth.getSession();
    const user = session?.user;

    const {data : watches, error} = await supabase.from('watch').select('*').eq('user_id', user.id);

    if(error) {
        console.error('error fetching watches');
    }

    console.log(watches);
    
}   