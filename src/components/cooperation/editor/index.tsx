import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { useEffect, useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';

import { fetchDocuments } from '@/app/cooperation/(router)/[room]/page';

export function Edit() {
  const ydoc = useMemo(() => new Y.Doc(), []);
  const [editor, setEditor] = useState<any>(null);
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [binding, setBinding] = useState<MonacoBinding | null>(null);

  const [docData, setDocData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchDocuments();
      setDocData((data as unknown as Array<any>)[0]);
    })();
  }, []);

  useEffect(() => {
    if (docData == null) {
      return;
    }

    const provider = new WebsocketProvider('ws://localhost:8080', 'collaborateDoc', ydoc, {
      params: {
        record_id: docData._id,
      },
    });
    setProvider(provider);

    return () => {
      provider?.destroy();
      ydoc.destroy();
    };
  }, [ydoc, docData]);

  useEffect(() => {
    if (provider == null || editor == null || docData === null) {
      return;
    }

    const newBinding = new MonacoBinding(
      ydoc.getText(),
      editor.getModel()!,
      new Set([editor]),
      provider?.awareness,
    );
    setBinding(newBinding);

    return () => {
      binding && binding.destroy();
    };
  }, [ydoc, provider, editor, docData]);

  const onChange = (value: any) => {
    ydoc.getText('content').insert(0, value);
  };

  return (
    <Editor
      className=" flex-1 h-full border-l border-white/20"
      theme="vs-dark"
      defaultLanguage="javascript"
      onMount={(editor) => {
        setEditor(editor);
      }}
      onChange={onChange}
    />
  );
}
