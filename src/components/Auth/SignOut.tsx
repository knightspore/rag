import { IoExitSharp } from "react-icons/io5";
import { supabase } from "../../lib/supabase";
import { useAppContext } from "../Providers/AppContextProvider";


export default function SignOut() {
    const { setUser } = useAppContext()

    function signOut() {
        supabase.auth.signOut().finally(() => {
            setUser(null)
        })
    }

    return <button onClick={signOut}>Log Out <IoExitSharp size={16} /></button>
}