'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import Loader from '../loader';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';
import usePosts from '@/hooks/usePosts';
import { UserPlus, UserMinus } from 'lucide-react';

interface FollowButtonProps extends VariantProps<typeof buttonVariants> {
  userId: string;
  className?: string;
  isFollowing?: boolean;
  asChild?: boolean;
  onOptimisticUpdate?: (isFollowing: boolean) => void;
}

const FollowButton = ({
  userId,
  className,
  isFollowing,
  asChild,
  onOptimisticUpdate,
  ...props
}: FollowButtonProps) => {
  const { mutate } = usePosts();
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  async function handleFollow() {
    // Optimistically update the UI
    const previousState = following;
    setFollowing(!following);
    onOptimisticUpdate?.(!following);
    setLoading(true);

    try {
      const response = await fetch(`/api/users/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to update follow status');

      const data = await response.json();
      mutate();
      toast.success(data.message);
    } catch (error) {
      // Revert optimistic update on error
      setFollowing(previousState);
      onOptimisticUpdate?.(previousState || false);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }

  return !asChild ? (
    <Button
      variant={props.variant || (isFollowing ? 'outline' : 'default')}
      size='sm'
      onClick={handleFollow}
      className={cn('capitalize', className)}
      disabled={loading}
    >
      {loading ? (
        <div className='flex items-center gap-2'>
          <Loader
            className={cn('h-4 w-4', {
              'text-white': !following,
              'text-muted-foreground': following,
            })}
          />
          <span>{!following ? 'Unfollowing...' : 'Following...'}</span>
        </div>
      ) : following ? (
        <span className='flex items-center gap-2'>
          <UserMinus className=' h-4 w-4' />
          Unfollow
        </span>
      ) : (
        <span className='flex items-center gap-2'>
          <UserPlus className=' h-4 w-4' />
          Follow
        </span>
      )}
    </Button>
  ) : (
    <span onClick={handleFollow}>
      {loading ? (
        <Loader className='h-4 w-4' />
      ) : following ? (
        'Unfollow'
      ) : (
        'Follow'
      )}
    </span>
  );
};

FollowButton.displayName = 'FollowButton';
export default FollowButton;
