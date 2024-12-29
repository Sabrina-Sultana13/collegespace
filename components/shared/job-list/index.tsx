import { JobType } from '@/lib/type';
import JobItem from './job-item';
import { Separator } from '@/components/ui/separator';
import EmptyState from '../empty-state';
import { Briefcase } from 'iconsax-react';

const JobList = ({ jobs }: { jobs: JobType[] | undefined }) => {
  if (!jobs || jobs?.length === 0)
    return (
      <EmptyState
        title='No jobs yet'
        description='No jobs to show'
        icon={<Briefcase className='h-12 w-12' />}
      />
    );
  return (
    <ul role='list'>
      {jobs?.map((job, index) => (
        <li key={job.id}>
          <JobItem job={job} />
          {index !== jobs.length - 1 && <Separator className='my-4' />}
        </li>
      ))}
    </ul>
  );
};

JobList.displayName = 'JobList';
export default JobList;
