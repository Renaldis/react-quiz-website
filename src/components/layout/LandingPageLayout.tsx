import type { ReactNode } from 'react';
import HomeHeader from '../Home/LandingPageHeader';
import HomeFooter from '../Home/LandingPageFooter';

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <HomeHeader />
      <main className="bg-[#f6f7f8] pb-10">{children}</main>
      <HomeFooter />
    </div>
  );
}
