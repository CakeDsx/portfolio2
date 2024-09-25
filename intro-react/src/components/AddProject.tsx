import React, { useState } from 'react';

const AddProject: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!title || !description || !date) {
      setError('All fields are required!');
      return;
    }

    const [year, month, day] = date.split('-');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/postjson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [title]: {
            id: Date.now(),
            date: { day, month, year },
            description,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to post data: ${response.status} ${errorText}`);
      }

      console.log("Successfully posted the project");
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Error: ${error.message}`);
      } else {
        setError('An unknown error occurred');
      }
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Add Projects</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Project Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="description"
          type="text"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input type="submit" disabled={loading} />
      </form>
      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
};

export default AddProject;
