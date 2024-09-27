import React, { useState } from 'react';
import { ChevronRight, FileText, Folder, Plus, Code, ChevronDown } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { createDocument } from '@/app/cooperation/(router)/[room]/page';

export interface Document {
  id: number;
  name: string;
}

interface Problem {
  id: number;
  title: string;
  difficulty: string;
}

interface CooperationProps {
  problems: Problem[];
  documents: Document[];
  setDocuments: (documents: Document[]) => void;
  activeDocument: Document | null;
  setActiveDocument: (document: Document | null) => void;
  activeProblemId: number | null;
  setActiveProblemId: (problemId: number | null) => void;
}

export const CooperationSidebar: React.FC<CooperationProps> = ({
  problems,
  documents,
  setActiveDocument,
  activeDocument,
  activeProblemId,
  setActiveProblemId,
  setDocuments,
}: CooperationProps) => {
  const [dialogState, setDialogState] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<{ documents: boolean; problems: boolean }>(
    {
      documents: true,
      problems: false,
    },
  );

  const createNewDocument = () => {
    if (!newDocumentName) return;
    //  后续修改

    const newDoc = { name: newDocumentName, id: Math.random() };
    createDocument({ docName: newDocumentName });
    setDocuments([...documents, newDoc]);
    setActiveDocument(newDoc);
    setNewDocumentName('');
    setDialogState(false);
  };

  const selectProblem = (problemId: number) => {
    if (activeDocument) {
      setActiveProblemId(problemId);
    }
  };

  const toggleFolder = (folder: 'documents' | 'problems') => {
    setExpandedFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <div className="w-64 bg-[#252526] flex flex-col">
      <ScrollArea className="flex-grow">
        <div className="p-2">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm font-medium py-1 px-2 text-gray-300 hover:bg-[#2d2d2d] hover:text-white transition-colors"
              onClick={() => toggleFolder('documents')}
            >
              {expandedFolders.documents ? (
                <ChevronDown className="h-4 w-4 mr-2" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2" />
              )}
              <Folder className="h-4 w-4 mr-2" />
              文档
            </Button>
            {expandedFolders.documents && (
              <div className="mt-1 ml-4 space-y-1">
                {documents?.map((doc) => (
                  <Button
                    key={doc.id}
                    variant="ghost"
                    className={`w-full justify-start text-sm py-1 px-2 hover:bg-[#2d2d2d] transition-colors ${
                      activeDocument?.id === doc.id ? 'bg-[#37373d] text-white' : 'text-gray-400'
                    }`}
                    onClick={() => setActiveDocument(doc)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {doc.name}
                  </Button>
                ))}
                <Dialog open={dialogState}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={() => setDialogState(true)}
                      className="w-full justify-start text-sm py-1 px-2 text-blue-400 hover:bg-[#2d2d2d] transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      新建文档
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogDescription></DialogDescription>
                      <DialogTitle>创建新文档</DialogTitle>
                    </DialogHeader>
                    <Input
                      value={newDocumentName}
                      onChange={(e) => setNewDocumentName(e.target.value)}
                      placeholder="输入文档名称"
                    />
                    <Button onClick={createNewDocument}>创建</Button>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          <div>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm font-medium py-1 px-2 text-gray-300 hover:bg-[#2d2d2d] hover:text-white transition-colors"
              onClick={() => toggleFolder('problems')}
            >
              {expandedFolders.problems ? (
                <ChevronDown className="h-4 w-4 mr-2" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2" />
              )}
              <Code className="h-4 w-4 mr-2" />
              题目
            </Button>
            {expandedFolders.problems && (
              <div className="mt-1 ml-4 space-y-1 px-2 mx-2">
                {problems.map((problem) => (
                  <Button
                    key={problem.id}
                    variant="ghost"
                    className={`w-full justify-start text-sm py-[0.4] px-2 hover:bg-[#2d2d2d] transition-colors ${
                      activeProblemId === problem.id ? 'bg-[#37373d] text-white' : 'text-gray-400'
                    }`}
                    onClick={() => selectProblem(problem.id)}
                  >
                    <div className="flex flex-col items-start px-2">
                      <p className=" max-w-40 truncate">{problem.title}</p>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
