import type { ReactNode } from 'react';
import HomeHeader from './HomeHeader';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <HomeHeader />
      <div className="bg-[#f6f7f8] h-dvh">{children}</div>
    </div>
  );
}
