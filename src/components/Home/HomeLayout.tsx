import type { ReactNode } from 'react';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <HomeHeader />
      <div className="bg-[#f6f7f8] pb-10">{children}</div>
      <HomeFooter />
    </div>
  );
}
