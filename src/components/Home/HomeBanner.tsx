import { Rocket } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

import HomeLogin from './HomeLogin';

export default function HomeBanner() {
  return (
    <Card className="shadow-none border-none bg-linear-330 from-blue-500 to-blue-700">
      <CardHeader className="flex justify-center">
        <div className="bg-linear-90 from-blue-300 to-blue-500 p-4 rounded-2xl shadow-2xl">
          <Rocket size={32} className="text-white" />
        </div>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="flex flex-col space-y-4">
          <h1 className="text-5xl text-white font-bold text-center">
            Test Your <br /> Knowledge!
          </h1>
          <p className="text-white">
            Challenge your mind with the worlds most advanced quizz platform.
            <br /> Track Progress, earn badges, and dominate the global
            leaderboards.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Card className="w-full max-w-187.5 gap-0">
          <CardHeader>Get Started Now!</CardHeader>
          <CardContent>
            <HomeLogin />
          </CardContent>
        </Card>
      </CardFooter>
    </Card>
  );
}
