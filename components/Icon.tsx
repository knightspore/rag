import Image from "next/image";

export default function Icon({ src }: { src?: string }) {

  const defaultIcon = "https://www.google.com/s2/favicons?domain=" + "http://ciaran.co.za"

  return (
    <div className="w-4 h-4 m-auto my-auto overflow-hidden border-2 rounded-full border-slate-700">
      <Image
        alt={src + " icon"}
        width={48}
        height={48}
        src={src || defaultIcon}
        loading="eager"
      />
    </div>
  );
}
