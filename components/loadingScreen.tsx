import { Spinner } from "@nextui-org/react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Spinner size="lg" />
      </div>
    </div>
  );
}
