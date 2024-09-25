import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  date: { day: string; month: string; year: string };
  description: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<{ [key: string]: Project }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); 
      try {
        const response = await fetch("http://localhost:3000/getjson");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message); 
        } else {
          setError('An unknown error occurred');
        }
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProjects();
  }, []);

  return (
    <section>
      <h2 id="projects">My Projects</h2>
      {loading && <p>Loading projects...</p>} {/* Show loading text */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Show error if present */}
      <div id="projectsDiv">
        {Object.keys(projects).length > 0 ? (
          Object.entries(projects).map(([key, project]) => (
            <div key={key}>
              <h3>{key}</h3>
              <p>{project.description}</p>
              <p>
                Date: {project.date.day}-{project.date.month}-{project.date.year}
              </p>
            </div>
          ))
        ) : (
          !loading && <p>No projects available.</p> 
        )}
      </div>
    </section>
  );
};

export default Projects;
