import Image from "next/image";

type Props = {
  image?: {
    sourceUrl: string;
    altText?: string;
  };
};

export default function PropertyGallery({ image }: Props) {
  if (!image) return null;

  return (
    <div className="rounded-xl overflow-hidden">

      <Image
        src={image.sourceUrl}
        alt={image.altText || "Property"}
        width={1400}
        height={700}
        className="w-full h-[550px] object-cover rounded-xl"
        priority
      />

    </div>
  );
}