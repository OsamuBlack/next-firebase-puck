export const HeadingOne = ({
  size,
  text,
}: {
  size: "sm" | "md" | "lg";
  text: string;
}) => {
  const sizeClasses = {
    sm: "text-2xl sm:text-3xl",
    md: "text-3xl sm:text-4xl",
    lg: "text-4xl sm:text-5xl md:text-6xl",
  };
  return (
    <h1 className={`${sizeClasses[size]} font-bold leading-snug`}>{text}</h1>
  );
};

export const Paragraph = ({
  size,
  text,
}: {
  size: "sm" | "md" | "lg";
  text: string;
}) => {
  const sizeClasses = {
    sm: "text-sm sm:text-base",
    md: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl",
  };
  return <p className={`${sizeClasses[size]} opacity-75`}>{text}</p>;
};
