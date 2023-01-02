import { JOBS_QUERY } from '../graphql/queries';
import { JOB_QUERY } from '../graphql/queries';
import { COMPANY_QUERY } from '../graphql/queries';
import { CREATE_JOB_MUTATION } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { getAccessToken } from '../auth';

export function useCreateJob(input) {
    const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION);

    return {
        createJob: async (title, description) => {
            const { data: { job } } = await mutate({
                variables: { input: { title, description } },
                context: {
                  headers: { 'Authorization': 'Bearer ' + getAccessToken() },
                },
                // BELOW WE WRITE DATA DIRECTLY INTO THE CACHE AFTER THE MUTATION WAS SUCCESSFUL
                update: (cache, { data: { job }}) => {
                  cache.writeQuery({
                      query: JOB_QUERY,
                      variables: { id: job.id },
                      data: { job },
                  });
                },
            });

            return job;
        },
        loading,
        error: Boolean(error),
    }
};

export function useCompany(id) {
    const { data, loading, error } = useQuery(COMPANY_QUERY, {
        variables: { id },
    });

    return {
        company: data?.company,
        loading,
        error: Boolean(error),
      };
};

export function useJob(id) {
    const { data, loading, error } = useQuery(JOB_QUERY, {
        variables: { id },
    });

    return {
        job: data?.job,
        loading,
        error: Boolean(error),
    };
};

export function useJobs() {
    const { data, loading, error } = useQuery(JOBS_QUERY, {
      fetchPolicy: 'network-only',
    });
  
    return {
      jobs: data?.jobs,
      loading,
      error: Boolean(error),
    };
};