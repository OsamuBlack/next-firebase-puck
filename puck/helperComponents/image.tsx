import Image from "next/image";

export type ImageType = {
  src: string;
  alt: string;
  priority?: boolean;
  width: number;
  height: number;
  fill?: boolean;
  type?: "cover" | "contain" | "stretch";
};

export const isValidURL = (string?: string) => {
  if (!string) return false;
  const res = string.match(
    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i
  );
  return res !== null;
};

export const isValidImageDomain = (string: string) => {
  const domains = [
    "firebasestorage.googleapis.com",
    "freepik.com",
    "flaticon",
    "flaticon.com",
    "unsplash.com",
  ];
  const res = domains.find((domain) => string.includes(domain));
  return res !== null;
};

export default function ImageRender({
  image,
  sizes,
  className,
}: {
  image: ImageType;
  sizes?: string;
  className?: string;
}) {
  const { src, alt, priority, width, height, fill, type } = image;
  if (!src) return null;
  if (!isValidURL(src)) {
    console.error(
      "Invalid URL for image src. Please provide a valid URL for the image."
    );
    return null;
  }
  if (!isValidImageDomain(src)) {
    console.error(
      "Invalid domain for image src. Please provide a valid domain for the image."
    );
    return null;
  }

  const fillType = fill
    ? {
        cover: "object-cover",
        contain: "object-contain",
        stretch: "object-stretch",
      }
    : {};

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width || 0}
      height={fill ? undefined : height || 0}
      sizes={sizes}
      className={className + (fill && type ? " " + fillType[type] : "")}
      priority={priority}
      fill={fill}
    />
  );
}
