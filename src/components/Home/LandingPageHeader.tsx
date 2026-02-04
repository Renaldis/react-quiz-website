import { GraduationCap } from 'lucide-react';

export default function HomeHeader() {
  return (
    <div className="flex justify-between p-2 px-2 sm:px-10 shadow-lg border-b items-center">
      <div className="flex flex-row gap-3 items-center">
        <GraduationCap size={24} color="blue" />
        <h1 className="text-base sm:text-xl font-bold">Quizzly</h1>
      </div>
    </div>
  );
}
