/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

interface Problem {
  id: number;
  title: string;
  difficulty: string;
  description: string;
  example: string;
}

interface Document {
  name: string;
}

interface ProblemDescriptionProps {
  currentDocument: Document | null;
  currentProblemId: number | null;
  problems: Problem[];
  currentProblem: Problem | null;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  currentDocument,
  currentProblem,
}) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Top Navigation */}
      <header className="flex items-center justify-between p-4 border-b border-[#2d2d2d]">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">
            {currentProblem ? currentProblem.title : '请先创建您的第一个文档'}
          </h1>
          <span className="text-sm text-muted-foreground">{currentProblem?.difficulty || ''}</span>
        </div>
      </header>

      {/* Problem Description */}
      <div className="p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">{currentProblem ? '问题描述' : ''}</h2>
        <p className="mb-4 text-sm">{currentProblem?.description || ''}</p>
        {currentProblem && (
          <>
            <h3 className="text-md font-semibold mb-2">示例:</h3>
            <pre className="bg-[#2d2d2d] p-2 rounded text-sm">{currentProblem.example}</pre>
          </>
        )}
      </div>
    </div>
  );
};

export default ProblemDescription;
