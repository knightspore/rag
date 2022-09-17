import Image from "next/image";

export default function Icon({ src }: { src: string }) {
  return (
      <div className="inline-block w-4 h-4">
          <Image
        alt={src + " icon"}
        width={48}
        height={48}
        layout="responsive"
        src={src}
      />
      </div>
  );
}
