import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { Clock, Award } from 'lucide-react';
import { categories, type Category } from '@/data/quizList';
import { useNavigate } from 'react-router';
import { DialogStartQuiz } from './quiz/DialogStartQuiz';
import { useQuizStore } from '@/store/quizStore';
import { useState } from 'react';

export default function DashboardHome() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const fetchQuiz = useQuizStore((state) => state.fetchQuiz);

  const [open, setOpen] = useState(false);
  const [quizData, setQuizData] = useState<Category>();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = async (opts: {
    type: 'multiple' | 'boolean';
    difficulty: 'easy' | 'medium' | 'hard';
    durationMinutes: number;
  }) => {
    if (!quizData) return;

    setIsLoading(true);

    try {
      await fetchQuiz({
        amount: 10,
        category: quizData.id,
        difficulty: opts.difficulty,
        type: opts.type,
        durationMinutes: opts.durationMinutes,
      });

      setOpen(false);
      navigate('/dashboard/quizz/active');
    } catch (error) {
      console.error('Gagal memulai quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold dark:text-white">
          Welcome back, {user?.name || 'Alex'}!
        </h1>
        <p className="text-muted-foreground">
          Ready to test your knowledge today?
        </p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-col lg:flex-row">
          <img src="/book-cover.jpg" alt="book-cover" className="object-fill" />
          <div className="flex flex-1 flex-col justify-between p-6">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="w-fit bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 uppercase text-xs font-semibold"
              >
                Recommended
              </Badge>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Quick Start Quiz</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Jump into a random 10-question quiz.
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>5 mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4" />
                  <span>100 XP</span>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  size="lg"
                >
                  Start Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Categories</h2>
          <Button
            variant="link"
            className="text-blue-500 hover:text-blue-600"
            onClick={() => navigate('/dashboard/quizz')}
          >
            See All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.slice(0, 3).map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="group relative overflow-hidden p-0 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg border-0 "
                onClick={() => {
                  setOpen(true);
                  setQuizData(category);
                }}
              >
                <div
                  className={`relative bg-linear-to-br ${category.bgColor} rounded-lg`}
                >
                  <div className="relative h-full flex flex-col justify-end p-5 text-white">
                    <div
                      className={`mb-3 h-10 w-10 rounded-full ${category.badgeColor} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-white/80">
                      {category.questionsCount} Available Quizzes
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <DialogStartQuiz
        open={open}
        setOpen={setOpen}
        quizData={quizData}
        onStartQuiz={handleStartQuiz}
        isLoading={isLoading}
      />
    </div>
  );
}
