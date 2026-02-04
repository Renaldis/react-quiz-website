import { Card } from '@/components/ui/card';
import { categories, type Category } from '@/data/quizList';
import { DialogStartQuiz } from './DialogStartQuiz';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuizStore } from '@/store/quizStore';

export default function QuizList() {
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
    <div className="space-y-6 sm:p-6 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Explore All Categories</h1>
          <p className="text-slate-500 mt-1">
            Choose a topic to test your knowledge and climb the leaderboard.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Card
              key={category.id}
              className="group flex pt-0 flex-col overflow-hidden cursor-pointer border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow dark:bg-[#1c2631]"
              onClick={() => {
                setOpen(true);
                setQuizData(category);
              }}
            >
              <div className={`px-4 pt-4 pb-3 ${category.bgColor}`}>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Icon
                      className={`h-6 w-6 text-slate-700 ${category.tint}`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-4 pb-4 ">
                <h3 className="text-lg font-semibold mb-1">{category.title}</h3>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                  {category.description}
                </p>

                <div className="flex-1" />

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <span>{category.questionsCount} Questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{category.playsCount} Plays</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
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
