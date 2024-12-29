import { Card, CardContent } from '@/components/ui/card';
import { Flex } from '@/components/layout/flex';
import { Heading } from '@/components/typography/heading';
import { Text } from '@/components/typography/text';
import UserMedia from '@/components/shared/user-media';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const StudentMediaCard = ({
  name,
  image,
  coverImage,
  bio,
  cv,
}: {
  name: string;
  image: string;
  coverImage: string;
  bio: string;
  cv: string | null | undefined;
}) => {
  return (
    <Card className='isolate h-auto overflow-hidden shadow-none'>
      <UserMedia name={name!} image={image!} coverImage={coverImage!} />
      <CardContent className='mt-12 w-full px-0'>
        <Flex align='center' justify='center' direction='column' px={4}>
          <Heading size='lg' as='h2' weight='medium'>
            {name}
          </Heading>
          <Text
            as='p'
            size='xs'
            align='center'
            className='line-clamp-3 text-muted-foreground'
          >
            {bio ?? 'No bio provided'}
          </Text>
          <a href={cv ?? ''} target='_blank' className='w-full'>
            <Button size='lg' className='mt-4 w-full' disabled={!cv}>
              <Flex gap={2} align='center'>
                <Download className='h-5 w-5' />
                <Text>Download CV</Text>
              </Flex>
            </Button>
          </a>
        </Flex>
      </CardContent>
    </Card>
  );
};

StudentMediaCard.displayName = 'StudentMediaCard';
export default StudentMediaCard;
