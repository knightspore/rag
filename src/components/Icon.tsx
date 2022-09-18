import Image from "next/image";

export default function Icon({ src }: { src: string | undefined }) {

  const defaultIcon = "https://www.google.com/s2/favicons?domain=" + "http://ciaran.co.za"

  return (
    <div className="inline-block w-4 h-4 rounded-full overflow-hidden">
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
