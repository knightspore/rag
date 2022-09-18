import Image from "next/image";

export default function Icon({ src }: { src: string | undefined }) {

  const defaultIcon = "https://www.google.com/s2/favicons?domain=" + "http://ciaran.co.za"

  return (
    <div className="w-4 h-4 m-auto overflow-hidden rounded-full">
      <Image
        alt={src + " icon"}
        width={48}
        height={48}
        layout="responsive"
        src={src || defaultIcon}
      />
    </div>
  );
}
