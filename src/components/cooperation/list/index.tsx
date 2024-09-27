export const List = () => {
  const handleCreate = async () => {
    fetch('http://localhost:8080/api/v1/document/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        docName: 'doc-1',
      }),
    });
  };

  return (
    <div style={{ width: '50vw' }}>
      <button onClick={handleCreate}>create</button>

      <div style={{ marginTop: '40px', borderTop: '1px solid e2e2e2' }}></div>
    </div>
  );
};
