import { ImageSectionProps } from "./imageSection";
import Section from "@/components/section";
import { HeadingOne, Paragraph } from "@/components/Typography";
import { Button } from "@nextui-org/react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import ImageRender from "../helperComponents/image";

const ImageSectionRender = ({
  image,
  title,
  description,
  section,
  layout,
  cta,
}: ImageSectionProps) => {
  return (
    <Section {...section}>
      <div
        className={`flex flex-col sm:flex-row gap-8 ${
          layout == "right-image" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="w-full sm:w-1/2 flex flex-col justify-center text-center sm:text-left align-center sm:align-top gap-4">
          <span className="sm:w-11/12">
            <HeadingOne size="lg" text={title} />
          </span>
          <span className="sm:w-3/4">
            <Paragraph size="md" text={description} />
          </span>
          {cta?.href ? (
            <div className="">
              <Button color={"primary"} endContent={<FaArrowRight />}>
                <Link href={cta.href} target={cta.target}>
                  {cta.text}
                </Link>
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-full sm:w-1/2">
          <div className="relative rounded-lg overflow-hidden aspect-square w-full">
            <ImageRender
              image={{ ...image, src: image.src, width: 0, height: 0, fill: true }}
              sizes={"(min-width: 640px) 50vw, 100vw"}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ImageSectionRender;
