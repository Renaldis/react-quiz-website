import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/quizStore';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PlayCircle, Trash2 } from 'lucide-react';

export function QuizResumeDialog() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { status, questions, currentQuestionIndex, restartQuiz } =
    useQuizStore();

  useEffect(() => {
    if (status === 'active' && questions.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
    }
  }, [status, questions]);

  const handleResume = () => {
    setIsOpen(false);
    navigate('/dashboard/quizz/active');
  };

  const handleDiscard = () => {
    restartQuiz();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <PlayCircle className="text-blue-500" />
            Resume Unfinished Quiz?
          </AlertDialogTitle>
          <AlertDialogDescription>
            We detected that you have an unfinished quiz session.
            <br />
            <span className="mt-2 block font-medium text-slate-700 bg-slate-100 p-2 rounded-md border border-slate-200">
              Progress: Question {currentQuestionIndex + 1} from{' '}
              {questions.length}
            </span>
            <br />
            Do you want to continue this quiz or cancel it?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleDiscard}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Discard
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleResume}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Resume Quiz
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
