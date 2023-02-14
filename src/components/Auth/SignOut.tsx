import {useState} from 'react';
import {IoExitOutline} from 'react-icons/io5';
import {supabase} from '../../lib/supabase';
import Modal from '../App/Modal';
import {useAppContext} from '../Providers/AppContextProvider';

export default function SignOut() {
    const {setUser} = useAppContext();
    const [open, setOpen] = useState(false);

    function signOut() {
        supabase.auth.signOut().finally(() => {
            setUser(null);
        });
    }

    return (
        <>
            <button title="Sign out" onClick={() => setOpen(true)}>
                <IoExitOutline size={16} />
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title="Leaving for now?"
                text="Log Out"
                callback={signOut}
            />
        </>
    );
}
