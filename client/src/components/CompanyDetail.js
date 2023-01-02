import { useParams } from 'react-router';
import { useCompany } from '../graphql/hooks';
import JobList from './JobList';

function CompanyDetail() {
  const { companyId } = useParams();
  const { company, loading, error } = useCompany(companyId);

  if (error) return <p>Sorry, something went wrong.</p>
  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h5 className='title is-5'>
        Jobs at {company.name}
      </h5>
      <JobList jobs={company.jobs}/>
    </div>
  );
}

export default CompanyDetail;
