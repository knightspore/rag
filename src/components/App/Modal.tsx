import {Dialog} from '@headlessui/react';

type Props = {
    open: boolean;
    setOpen: (b: boolean) => void;
    title: string;
    text: string;
    callback: () => void;
};

export default function Modal({open, setOpen, title, text, callback}: Props) {
  
  function handleCallback() {
    callback()
    setOpen(false)
  }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="absolute inset-0 z-50 flex items-center justify-center text-center select-none bg-slate-900/90">
                <Dialog.Panel
                    as="div"
                    className="p-4 text-slate-400"
                >
                    <Dialog.Title
                        as="h2"
                        className="text-lg"
                    >
                        {title}
                    </Dialog.Title>
                    <div className="flex justify-center mt-4 gap-4">
                        <button
                            onClick={handleCallback}
                            className="p-1 px-2 text-lg card error"
                        >
                            {text}
                        </button>
                        <button
                            onClick={() => setOpen(false)}
                            className="p-1 px-2 text-lg card"
                        >
                            Cancel
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
