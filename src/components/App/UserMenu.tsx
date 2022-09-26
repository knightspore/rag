import { supabase } from "../../lib/supabase"
import { Menu  } from "@headlessui/react"
import AddSubscriptionForm from "./AddSubscriptionForm"
import { useAppContext } from "../provider/AppContextProvider"

export default function UserMenu() {

  const { user, setUser } = useAppContext()
  const signOut = () => {
      supabase.auth.signOut()
      setUser(null)
  }

  return (
    <nav className="flex justify-end pt-2">
      <Menu as="div" className="relative">
        <div className="flex gap-2">
        <AddSubscriptionForm />
        <Menu.Button as="button">Menu</Menu.Button>
        </div>
        <Menu.Items>
          <div className="absolute right-0 z-20 bottom-10 w-max">
            <section id="user-menu" className="relative flex flex-col gap-4 p-4 rounded-sm bg-slate-700">
              <button disabled>{user?.email}</button>
              <button onClick={signOut}>Log Out</button>
            </section>
          </div>
        </Menu.Items>
      </Menu>
    </nav>
  )
}
