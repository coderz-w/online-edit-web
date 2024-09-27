'use client';

// import { List } from '@/components/cooperation/list';
// import { Edit } from '@/components/cooperation/editor';
import { useEffect, useState } from 'react';

import { CooperationHeader } from '@/components/cooperation/header';
import { CooperationSidebar } from '@/components/cooperation/sidebar/index';
import { Edit } from '@/components/cooperation/editor';
import ProblemDetail from '@/components/cooperation/problemDetail/index';
import { Document } from '@/components/cooperation/sidebar/index';
interface CooperationPageProps {
  params: any;
}

export const fetchDocuments = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/v1/document/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);

    return [];
  }
};

export const createDocument = async ({ docName }: { docName: string }) => {
  try {
    const res = await fetch('http://localhost:8080/api/v1/document/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        docName: docName,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {}
};

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'qqqqq哈哈哈哈啊哈啊啊',
    example: '9999999',
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    description: 'ewqeqwe哈哈哈哈啊哈啊啊',
    example: '9999999',
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'rewrew哈哈哈哈啊哈啊啊',
    example: '9999999',
  },
];

export default function CooperationPage({ params }: CooperationPageProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [activeDocument, setActiveDocument] = useState<Document | null>(null);
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchDocuments();
      console.log(data);
      setDocuments(
        data.map((item: { _id: any; docName: any }) => ({
          id: item._id,
          name: item.docName,
        })),
      );
    })();
  }, []);

  return (
    <div className=" flex flex-col w-[100vw] h-[100vh] overflow-hidden">
      <div className=" w-full h-[5vh] flex items-center justify-around bg-[#24262b]">
        <CooperationHeader roomId={params.roomId} roomInfo={{}} />
      </div>
      <div className=" flex-1 flex w-full h-full overflow-hidden bg-[#1e1e1e]">
        <div className=" flex-[1.4] flex h-full bg-[#202327]">
          <CooperationSidebar
            documents={documents}
            setDocuments={setDocuments}
            activeDocument={activeDocument}
            setActiveDocument={setActiveDocument}
            activeProblemId={activeProblemId}
            setActiveProblemId={setActiveProblemId}
            problems={problems}
          />
        </div>
        <div className=" flex-[3.8] h-full">
          <ProblemDetail
            currentProblemId={activeProblemId}
            currentDocument={activeDocument}
            problems={problems}
          />
        </div>
        <div className=" flex-[5] h-full">
          <Edit />
        </div>
      </div>
    </div>
  );
}
