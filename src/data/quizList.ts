import { Car, Cat, Star, Trophy } from 'lucide-react';

export type Category = {
  id: number;
  title: string;
  description: string;
  questionsCount: number;
  playsCount: string;
  icon: React.ElementType;
  tint: string;
  bgColor: string;
  badgeColor: string;
};

export const categories: Category[] = [
  {
    id: 27,
    title: 'Animals',
    description:
      'Discover fascinating facts about animals from all over the world.',
    questionsCount: 10,
    playsCount: '5k',
    icon: Cat,
    bgColor: 'bg-emerald-500',
    tint: 'bg-emerald-50',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  {
    id: 28,
    title: 'Vehicles',
    description:
      'From classic cars to modern aircraft and everything in between.',
    questionsCount: 10,
    playsCount: '3.2k',
    icon: Car,
    bgColor: 'bg-sky-500',
    tint: 'bg-sky-50',
    badgeColor: 'bg-sky-100 text-sky-700 border-sky-200',
  },
  {
    id: 21,
    title: 'Sports',
    description:
      'Test your knowledge about sports, teams, records, and legends.',
    questionsCount: 10,
    playsCount: '7.8k',
    icon: Trophy,
    bgColor: 'bg-amber-500',
    tint: 'bg-amber-50',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  {
    id: 26,
    title: 'Celebrities',
    description:
      'Movies, music, TV, and the stories behind your favorite stars.',
    questionsCount: 10,
    playsCount: '4.1k',
    icon: Star,
    bgColor: 'bg-purple-500',
    tint: 'bg-purple-50',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
  },
];
