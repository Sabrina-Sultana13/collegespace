'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import ToolTipParent from '../../tooltip-parent';
import { useRouter } from 'next/navigation';

const SendMessage = ({ recipientId }: { recipientId: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/messages?recipient=${recipientId}`);
  };

  return (
    <ToolTipParent content='Chat'>
      <Button size='icon' variant='outline' onClick={handleClick}>
        <MessageSquare className='h-4 w-4' aria-label='Send Message' />
      </Button>
    </ToolTipParent>
  );
};

export default SendMessage;
