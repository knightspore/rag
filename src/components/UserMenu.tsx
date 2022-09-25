import { useUserContext } from "../components/provider/UserContextProvider"
import { supabase } from "../lib/supabase"
import { Menu  } from "@headlessui/react"
import AddSubscriptionForm from "./AddSubscriptionForm"

export default function UserMenu() {

  const user = useUserContext()
  const signOut = () => {
      supabase.auth.signOut()
      window.location.reload()
  }

  return (
    <nav className="flex justify-end py-2">
      <Menu as="div" className="relative">
        <div className="gap-2 flex">
        <AddSubscriptionForm />
        <Menu.Button as="button">Menu</Menu.Button>
        </div>
        <Menu.Items>
          <div className="absolute top-10 right-0 w-max z-20">
            <section id="user-menu" className="rounded-sm gap-4 flex flex-col p-4 bg-slate-700 relative">
              <button disabled>{user.email}</button>
              <button onClick={signOut}>Log Out</button>
            </section>
          </div>
        </Menu.Items>
      </Menu>
    </nav>
  )
}
