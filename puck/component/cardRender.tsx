import { Button, Card, CardBody, Spacer } from "@nextui-org/react";
import { CardsSectionProps } from "./cardsSection";
import Link from "next/link";
import Image from "next/image";
import { isValidImageDomain, isValidURL } from "@/lib/utilities/validations";
import Section from "@/components/section";
import { HeadingOne, Paragraph } from "@/components/Typography";

const CardsSectionRender = ({
  title,
  description,
  cards,
  section,
}: CardsSectionProps) => {
  return (
    <Section {...section}>
      <div className="col-12 text-center py-8">
        <HeadingOne size="md" text={title} />
        <Paragraph size="md" text={description} />
      </div>
      <div className="flex flex-wrap -mr-4 -pb-4">
        {cards.map((card, index) => (
          <div className="sm:w-1/2 lg:w-1/3 pr-4 pb-4 flex" key={index}>
            <Card className="py-4 shadow-md border w-full">
              <CardBody className="pb-0 pt-2 px-4 flex-col items-center text-center">
                {isValidURL(card.icon?.src) &&
                isValidImageDomain(card.icon.src) ? (
                  <Image {...card.icon} />
                ) : (
                  ""
                )}
                <Spacer y={2} />
                <h2 className="text-lg font-bold">{card.title}</h2>
                <p>{card.description}</p>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default CardsSectionRender;
