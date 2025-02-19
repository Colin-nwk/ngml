import React, { createContext, useContext, useState, ReactNode } from "react";

type Question = {
  id: number;
  text?: string;
  name?: string;
  options?: any[];
  elementType: string;
};

interface QuestionContextType {
  questions: Question[];
  addQuestion: (question: Question) => void;
  deleteQuestion: (index: number) => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined
);

export const QuestionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const saveQuestion = (question: Question) => {
    setQuestions((prevQuestions) => {
      const questionIndex = prevQuestions.findIndex(
        (q) => q.id === question.id
      );

      if (questionIndex !== -1) {
        // Update existing question
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[questionIndex] = question;
        return updatedQuestions;
      } else {
        // Add new question
        return [...prevQuestions, question];
      }
    });
  };

  const deleteQuestion = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  return (
    <QuestionContext.Provider
      value={{ questions, addQuestion: saveQuestion, deleteQuestion }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

// Custom hook to use the QuestionContext
export const useQuestionContext = (): QuestionContextType => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error(
      "useQuestionContext must be used within a QuestionProvider"
    );
  }
  return context;
};
