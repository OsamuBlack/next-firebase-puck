import { Field, ObjectField } from "@measured/puck";

export type SectionProps = {
  background: string;
  id?: string;
  textColor?: string;
};

export const SectionFields: any = {
  type: "object",
  label: "Section",
  objectFields: {
    background: { type: "text", label: "Background" },
    id: { type: "text", label: "ID" },
    textColor: { type: "text", label: "Text Color" },
  },
};

export const defaultSectionProps = {
  background: "",
  id: "",
  textColor: "",
};

export default function Section({
  children,
  background,
  id,
  textColor,
}: {
  children: React.ReactNode;
  background: string;
  id?: string;
  textColor?: string;
}) {
  return (
    <div
      style={{
        background: background,
        color: textColor,
      }}
      id={id}
    >
      <div className="mx-auto container px-4 sm:px-8 max-w-6xl py-8 md:py-16">
        {children}
      </div>
    </div>
  );
}
