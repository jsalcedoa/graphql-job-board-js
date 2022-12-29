import JobList from './JobList';
// import { jobs } from '../fake-data';
import { getJobs } from '../graphql/queries';
import { useEffect, useState } from 'react';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // getJobs().then((jobs) => setJobs(jobs));
    getJobs().then(setJobs)
      .catch((err) => setError(true));
  }, []);

  if (error) return <p>Sorry, something went wrong.</p>
  if (!jobs) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
