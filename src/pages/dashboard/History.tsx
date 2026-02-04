import { useState } from 'react';
import { useQuizStore } from '@/store/quizStore';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Trash2,
  History as HistoryIcon,
  Trophy,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function History() {
  const { history, clearHistory } = useQuizStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHistory = history.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / (total * 10)) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getColorDifficult = (difficulty: string) => {
    const diff = difficulty.toLowerCase();
    if (diff === 'easy') {
      return 'bg-green-500';
    } else if (diff === 'medium') {
      return 'bg-yellow-500';
    } else if (diff === 'hard') {
      return 'bg-red-500';
    } else {
      return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiz History</h1>
          <p className="text-slate-500 mt-1">
            View your travel history and score progress.
          </p>
        </div>

        {history.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all history?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All your quiz score records will
                  be permanently deleted from this browser.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    clearHistory();
                    setCurrentPage(1);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Yes, Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5 text-slate-500" />
            <CardTitle>Recent Attempts</CardTitle>
          </div>
          <CardDescription>
            Displaying the last {history.length} quizzes that have been
            completed.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="bg-slate-100 p-4 rounded-full">
                <Trophy className="h-10 w-10 text-slate-300" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">
                  No history yet
                </h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  You haven't completed any quizzes yet. Start playing quizzes
                  to see your progress here!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-50">Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead className="text-center">Questions</TableHead>
                      <TableHead className="text-center">Score (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-slate-600">
                          <div className="flex items-center gap-2">
                            <CalendarClock className="h-4 w-4 text-slate-400" />
                            {formatDate(item.date)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-slate-700">
                            {item.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              `capitalize font-normal text-white p-1 px-4`,
                              getColorDifficult(item.difficulty),
                            )}
                          >
                            {item.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center text-slate-500">
                          {item.totalQuestions}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center gap-1">
                            <Progress
                              value={item.score}
                              className={`w-[60%]`}
                              indicatorClassName={getScoreColor(
                                item.score,
                                item.totalQuestions,
                              )}
                            />
                            <p className="text-muted-foreground">
                              {item.score}%
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {history.length > itemsPerPage && (
                <div className="flex items-center justify-between px-4 py-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
