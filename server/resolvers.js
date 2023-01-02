import { Company, Job } from "./db.js"; 

function rejectIf(condition) {
    if (condition) throw new Error('Unauthorized');
};

// function delay(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms))
// };

export const resolvers = {
    Query: {
        company: (_root, { id }) => Company.findById(id),
        job: (_root, { id }) => Job.findById(id),
        jobs: () => Job.findAll(),
    },
    Mutation: {
        createJob: async (_root, { input }, { user }) => {
            rejectIf(!user);
            // await delay(2000);
            return Job.create({ ...input, companyId: user.companyId });
        },
        deleteJob: async (_root, { id }, { user }) => {
            // CHECK IF USER IS AUTHENTICATED AND THAT THE JOB BELONGST TO THE USER'S COMPANY
            rejectIf(!user);
            const job = await Job.findById(id);
            rejectIf(job.companyId !== user.companyId);
            return Job.delete(id)
        },
        updateJob: async (_root, { input }, { user }) => {
            // CHECK IF USER IS AUTHENTICATED AND THAT THE JOB BELONGST TO THE USER'S COMPANY
            rejectIf(!user);
            const job = await Job.findById(input.id);
            rejectIf(job.companyId !== user.companyId);
            return Job.update({ ...input, companyId: user.companyId })
        },
    },
    Company: {
        jobs: (company) => Job.findAll((job) => job.companyId === company.id),
    },
    Job: {
        company: (job) => Company.findById(job.companyId),
    },
};
