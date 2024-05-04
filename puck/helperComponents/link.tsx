import NextLink from "next/link";

export type LinkType = {
  text: string;
  href: string;
  target: "_blank" | "_self";
  className?: string;
};

export default function Link({ text, href, target, className }: LinkType) {
  if (href)
    return (
      <NextLink href={href} target={target || "_self"} className={className}>
        {text}
      </NextLink>
    );
  else return null;
}
