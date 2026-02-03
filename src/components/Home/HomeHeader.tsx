import { GraduationCap } from 'lucide-react';
// import { Button } from '../ui/button';

// const header = [
//   { title: 'Home', link: '/' },
//   { title: 'LeaderBoard', link: 'dashboard/leaderboard' },
//   { title: 'Categories', link: 'dashboard/categories' },
// ];

export default function HomeHeader() {
  // const pathname = location.pathname;

  return (
    <div className="flex justify-between p-2 px-2 sm:px-10 shadow-lg border-b items-center">
      <div className="flex flex-row gap-3 items-center">
        <GraduationCap size={24} color="blue" />
        <h1 className="text-base sm:text-xl font-bold">Quizzly</h1>
      </div>

      <div className="flex flex-row space-x-8 items-center text-sm font-medium">
        {/* {header.map((item, idx) => {
          return (
            <a href={item.link} key={`${idx}-${item.title}`}>
              <p className={`${pathname === item.link ? 'text-blue-600' : ''}`}>
                {item.title}
              </p>
            </a>
          );
        })} */}
        {/* <Button className="bg-blue-500 hover:bg-blue-700">Sign In</Button> */}
      </div>
    </div>
  );
}
