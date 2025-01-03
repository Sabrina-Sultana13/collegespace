'use client';

import { ReplyType } from '@/lib/type';
import usePosts from '@/hooks/usePosts';
import { Flex } from '@/components/layout/flex';
import Loader from '@/components/shared/loader';
import { Separator } from '@/components/ui/separator';
import PostItem from '@/components/shared/posts/post-item';
import ReplyItem from '@/components/shared/posts/reply/reply-item';
import EmptyState from '@/components/shared/empty-state';
import { Messages3 } from 'iconsax-react';

interface PostPageProps {
  params: { postId: string };
}

export default function PostPage(props: PostPageProps) {
  const params = props.params;
  const { data, isLoading } = usePosts(params.postId, 'single');
  const replies = data ? data?.replies : [];

  if (isLoading) return <Loader className='h-[80vh]' />;

  return (
    <Flex direction='column' mx='auto'>
      {data && <PostItem post={data} />}
      <Separator className='mt-4' />
      {replies.length === 0 ? (
        <EmptyState
          icon={<Messages3 size={32} />}
          title='No replies'
          description='No one has replied to this post yet.'
        />
      ) : (
        <ul role='reply-list'>
          {replies.map((reply: ReplyType, index) => (
            <li key={reply.id}>
              <ReplyItem
                id={reply.id}
                content={reply.content}
                createdAt={reply.createdAt}
                user={reply.user}
              />
              {index !== replies.length && <Separator />}
            </li>
          ))}
        </ul>
      )}
    </Flex>
  );
}
