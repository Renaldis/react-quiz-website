import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { Category } from '@/data/quizList';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

type DProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  quizData: Category | undefined;
  isLoading?: boolean;
  onStartQuiz?: (opts: {
    type: 'multiple' | 'boolean';
    difficulty: 'easy' | 'medium' | 'hard';
    durationMinutes: number;
  }) => void;
};

const QUIZ_DURATION_MINUTES = 15;

export function DialogStartQuiz({
  open,
  setOpen,
  quizData,
  onStartQuiz,
  isLoading = false,
}: DProps) {
  const [type, setType] = useState<'multiple' | 'boolean'>('multiple');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'easy',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onStartQuiz?.({
      type,
      difficulty,
      durationMinutes: QUIZ_DURATION_MINUTES,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{quizData?.title ?? 'Start Quiz'}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quiz-type">Question Type</Label>
              <Select
                value={type}
                onValueChange={(val: 'multiple' | 'boolean') => setType(val)}
                disabled={isLoading}
              >
                <SelectTrigger id="quiz-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple">Multiple Choice</SelectItem>
                  <SelectItem value="boolean">True / False</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quiz-difficulty">Difficulty</Label>
              <Select
                value={difficulty}
                onValueChange={(val: 'easy' | 'medium' | 'hard') =>
                  setDifficulty(val)
                }
                disabled={isLoading}
              >
                <SelectTrigger id="quiz-difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md bg-slate-50 border border-slate-100 px-3 py-2 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-700">Quiz Rules</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>
                Processing time:{' '}
                <span className="font-semibold">
                  {QUIZ_DURATION_MINUTES} minutes
                </span>
                .
              </li>
              <li>
                The question will automatically move on after being answered.
              </li>
              <li>
                The results will be displayed automatically when the time is up.
              </li>
            </ul>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Preparing...
                </>
              ) : (
                'Play Quiz'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
