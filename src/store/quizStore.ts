import { create } from 'zustand';
import axios from 'axios';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface QuestionResult {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizQuestion extends QuestionResult {
  id: number;
  all_options: string[];
}

interface QuizParams {
  amount: number;
  category?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple' | 'boolean';
}

export interface QuizHistoryItem {
  id: string;
  date: string;
  category: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  type: string;
}

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  userAnswers: Record<number, string>;
  status: 'idle' | 'loading' | 'active' | 'finished' | 'error';
  endTime: number | null;

  history: QuizHistoryItem[];

  fetchQuiz: (
    params: QuizParams & { durationMinutes: number },
  ) => Promise<void>;
  answerQuestion: (answer: string) => void;
  restartQuiz: () => void;
  clearHistory: () => void;
}

const decodeHtml = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: {},
      status: 'idle',
      endTime: null,
      history: [],

      fetchQuiz: async (params) => {
        set({
          status: 'loading',
          questions: [],
          score: 0,
          currentQuestionIndex: 0,
        });

        try {
          const queryParams = new URLSearchParams({
            amount: params.amount.toString(),
          });

          if (params.category)
            queryParams.append('category', params.category.toString());
          if (params.difficulty)
            queryParams.append('difficulty', params.difficulty);
          if (params.type) queryParams.append('type', params.type);

          const url = `https://opentdb.com/api.php?${queryParams.toString()}`;

          const response = await axios.get(url);
          const data = response.data;

          if (data.response_code !== 0) {
            throw new Error(
              'Failed to load questions or not enough questions available.',
            );
          }

          const processedQuestions = data.results.map(
            (q: QuestionResult, index: number) => {
              const decodedQuestion = decodeHtml(q.question);
              const decodedCorrect = decodeHtml(q.correct_answer);
              const decodedIncorrect = q.incorrect_answers.map(decodeHtml);

              return {
                ...q,
                id: index,
                question: decodedQuestion,
                correct_answer: decodedCorrect,
                incorrect_answers: decodedIncorrect,
                all_options: shuffleArray([
                  decodedCorrect,
                  ...decodedIncorrect,
                ]),
              };
            },
          );

          const targetTime = Date.now() + params.durationMinutes * 60 * 1000;

          set({
            questions: processedQuestions,
            status: 'active',
            endTime: targetTime,
          });
        } catch (error) {
          console.error('Quiz Fetch Error:', error);
          set({ status: 'error' });
        }
      },

      answerQuestion: (answer) => {
        const { questions, currentQuestionIndex, score, userAnswers, history } =
          get();
        const currentQuestion = questions[currentQuestionIndex];

        const isCorrect = currentQuestion.correct_answer === answer;
        const pointsToAdd = isCorrect ? 10 : 0;

        const newUserAnswers = {
          ...userAnswers,
          [currentQuestionIndex]: answer,
        };

        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        if (isLastQuestion) {
          const finalScore = score + pointsToAdd;

          const newHistoryItem: QuizHistoryItem = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            category: questions[0].category,
            difficulty: questions[0].difficulty,
            type: questions[0].type,
            score: finalScore,
            totalQuestions: questions.length,
          };

          set({
            score: score + pointsToAdd,
            userAnswers: newUserAnswers,
            status: 'finished',
            endTime: null,
            history: [newHistoryItem, ...history],
          });
        } else {
          set({
            score: score + pointsToAdd,
            userAnswers: newUserAnswers,
            currentQuestionIndex: currentQuestionIndex + 1,
          });
        }
      },

      restartQuiz: () => {
        set({
          questions: [],
          currentQuestionIndex: 0,
          score: 0,
          userAnswers: {},
          status: 'idle',
          endTime: null,
        });
      },
      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
