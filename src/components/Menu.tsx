import { useUserContext } from "../components/provider/UserContextProvider"
import { supabase } from "../lib/supabase"
import AddSubscriptionForm from "./AddSubscriptionForm"

export default function Menu() {
    const user = useUserContext()
    const signOut = () => {
        supabase.auth.signOut()
        window.location.reload()
    }
  return (
    <nav>
      <AddSubscriptionForm />
      <button onClick={signOut}>Log Out: {user.email}</button>
    </nav>
  )
}
