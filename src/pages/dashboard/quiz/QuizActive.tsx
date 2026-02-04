import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function QuizActive() {
  const navigate = useNavigate();

  const { questions, currentQuestionIndex, status, answerQuestion, endTime } =
    useQuizStore();

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (status === 'idle' || questions.length === 0) {
      navigate('/dashboard/quizz');
    }

    if (status === 'finished') {
      navigate('/dashboard/quizz/result');
    }
  }, [status, questions, navigate]);

  useEffect(() => {
    if (status !== 'active' || !endTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const difference = Math.floor((endTime - now) / 1000);

      if (difference <= 0) {
        setTimeLeft(0);

        navigate('/dashboard/quizz/result');
      } else {
        setTimeLeft(difference);
      }
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [status, endTime, navigate]);

  if (status === 'loading' || !questions[currentQuestionIndex]) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-slate-500 animate-pulse">Loading questions...</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">
              Question {currentQuestionIndex + 1}
              <span className="text-slate-400 text-lg ml-1">
                / {questions.length}
              </span>
            </h2>
            <Badge
              variant="outline"
              className="text-slate-500 border-slate-300"
            >
              {currentQ.category} • {currentQ.difficulty}
            </Badge>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${timeLeft < 60 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}
          >
            <Clock className="w-5 h-5" />
            <span className="font-mono text-xl font-bold">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <Progress value={progressPercentage} className="h-2" />
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-8 pt-8">
          <h3 className="text-xl md:text-2xl font-semibold text-center leading-relaxed text-slate-800">
            {currentQ.question}
          </h3>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-4">
            {currentQ.all_options.map((option, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="group relative h-auto py-6 px-6 justify-start text-left text-base font-normal hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all border-slate-200"
                onClick={() => answerQuestion(option)}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-medium text-slate-500 group-hover:border-blue-500 group-hover:text-blue-600 transition-colors"></div>
                  <span className="flex-1">{option}</span>
                  <ChevronRight className="w-5 h-5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Button>
            ))}
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 text-xs text-center text-slate-400 justify-center">
          <AlertCircle className="w-3 h-3 mr-2" />
          Selecting an answer will immediately proceed to the next question.
        </CardFooter>
      </Card>
    </div>
  );
}
