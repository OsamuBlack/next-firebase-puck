import { colorVariants, Spinner } from "@nextui-org/react";
import { FaInfo } from "react-icons/fa";

export default function MessageScreen({
  message,
  color = "default",
}: {
  message: string;
  color?: keyof typeof colorVariants.solid;
}) {
  console.log(colorVariants.solid[color]);
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        <FaInfo size={32} className={colorVariants.light[color]} />
        <p className={colorVariants.light[color]}>{message}</p>
      </div>
    </div>
  );
}
