import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Trophy, RefreshCcw, LayoutDashboard } from 'lucide-react';

export default function QuizFinish() {
  const navigate = useNavigate();

  const { score, questions, status, restartQuiz } = useQuizStore();

  const totalQuestions = questions.length;
  const correctAnswersCount = score / 10;
  const wrongAnswersCount = totalQuestions - correctAnswersCount;
  const percentage = Math.round((correctAnswersCount / totalQuestions) * 100);

  useEffect(() => {
    if (status === 'idle' || questions.length === 0) {
      navigate('/dashboard');
    }
  }, [status, questions, navigate]);

  const handlePlayAgain = () => {
    restartQuiz();
    navigate('/dashboard/quizz');
  };

  const handleBackToDashboard = () => {
    restartQuiz();
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center sm:p-6">
      <Card className="w-full  border-slate-200 shadow-xl text-center overflow-hidden">
        <CardHeader className="bg-slate-50 pb-10 pt-10 border-b border-slate-100 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="absolute -inset-4 bg-yellow-400/20 blur-xl rounded-full"></div>
            <div className="relative bg-white p-4 rounded-full shadow-sm border border-yellow-100">
              <Trophy className="w-12 h-12 text-yellow-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">Quiz Completed!</h1>
          <p className="text-slate-500 mt-2">Here is your performance result</p>
        </CardHeader>

        <CardContent className="space-y-6 pt-8">
          <div className="space-y-2">
            <span className="text-6xl font-black text-slate-900 tracking-tighter">
              {score}
            </span>
            <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">
              Total Score
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-100 py-6">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-medium uppercase">
                Questions
              </p>
              <p className="text-xl font-bold text-slate-700">
                {totalQuestions}
              </p>
            </div>
            <div className="space-y-1 border-l border-r border-slate-100">
              <p className="text-xs text-green-500 font-medium uppercase">
                Correct
              </p>
              <p className="text-xl font-bold text-green-600">
                {correctAnswersCount}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-red-500 font-medium uppercase">
                Wrong
              </p>
              <p className="text-xl font-bold text-red-600">
                {wrongAnswersCount}
              </p>
            </div>
          </div>

          <p className="text-slate-500 text-sm">
            {percentage >= 80
              ? "Amazing job! You're a master!"
              : percentage >= 50
                ? 'Good effort! Keep practicing.'
                : "Don't give up! Try again to improve."}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pb-8 px-8">
          <Button
            className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
            onClick={handlePlayAgain}
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Play Again
          </Button>

          <Button
            variant="outline"
            onClick={handleBackToDashboard}
            className="w-full"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
