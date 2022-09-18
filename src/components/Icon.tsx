import Image from "next/image";

export default function Icon({ src }: { src: string | undefined }) {

  const iconLink = "https://www.google.com/s2/favicons?domain=" + src
  return (
      <div className="inline-block w-4 h-4">
          <Image
        alt={src + " icon"}
        width={48}
        height={48}
        layout="responsive"
        src={iconLink}
      />
      </div>
  );
}
