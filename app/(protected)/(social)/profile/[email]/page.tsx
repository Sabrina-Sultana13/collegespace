'use client';

import useUser from '@/hooks/useUser';
import { Box } from '@/components/layout/box';
import { Flex } from '@/components/layout/flex';
import { Container } from '@/components/layout/container';
import ProfileData from '../components/profile-data';
import ProfileActivities from '../components/profile-activites';
import Loader from '@/components/shared/loader';


interface ProfilePageProps {  
  params: { email: string };
}

const ProfilePage = (props: ProfilePageProps) => {
  const params = props.params;
  const { email } = params;
  const { user, isLoading } = useUser(email);

  return isLoading ? (
    <Loader className='h-[80vh]' />
  ) : (
    user && (
      <Box mx='auto' className='page-width'>
        <Container>
          <Flex direction='column' align='start' gap={4}>
            <ProfileData user={user} isLoading={isLoading} />
            <ProfileActivities email={email} />
          </Flex>
        </Container>
      </Box>
    )
  );
};

export default ProfilePage;
