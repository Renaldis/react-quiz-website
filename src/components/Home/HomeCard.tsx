import { Award, History, Zap, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

type TypeCard = {
  Icon: LucideIcon;
  label: string;
  description: string;
};

const cardData = [
  {
    Icon: Zap,
    label: 'Vibrant UI',
    description:
      'A clean minimalist design with ultra-smooth transitions designed for focus.',
  },
  {
    Icon: History,
    label: 'Session History',
    description:
      'Keep track of every quiz attempt, detailed analytics, and your learning progress.',
  },
  {
    Icon: Award,
    label: 'Session History',
    description:
      'Challenge your friends and climb the leaderboard against players worldwide.',
  },
];

export default function HomeCard() {
  return (
    <div className="mt-5">
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center">Why Quizzly?</h1>
        <div className="w-25 rounded-full self-center mt-2 bg-linear-90 from-blue-300 to-blue-600 h-2" />
      </div>
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-3 mt-5 max-w-6xl space-x-4">
          {cardData.map((el: TypeCard, idx) => (
            <Card key={idx} className="gap-0 space-y-2">
              <CardHeader>
                <div className="bg-blue-100 w-fit p-3 rounded-lg">
                  {<el.Icon className="text-blue-500 font-bold" />}
                </div>
              </CardHeader>
              <CardContent className="text-lg font-bold">
                {el.label}
              </CardContent>
              <CardFooter className="text-muted-foreground">
                {el.description}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
