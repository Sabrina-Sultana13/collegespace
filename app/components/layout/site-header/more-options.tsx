'use client';

import { useTheme } from 'next-themes';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import {
  Lifebuoy,
  More,
  Setting,
  InfoCircle,
  Sun1,
  Moon,
  LogoutCurve,
  Chart2,
  Bubble,
} from 'iconsax-react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/typography/text';
import ScreenReaderOnly from '@/components/ui/screen-reader-only';

const tools = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Chart2,
  },
  {
    label: 'AI Assistant',
    href: '/ai-assistant',
    icon: Bubble,
  },
];

const links = [
  {
    label: 'Settings & Privacy',
    href: '/settings',
    icon: Setting,
  },
  {
    label: 'Help & Support',
    href: '#',
    icon: Lifebuoy,
  },
  {
    label: 'About',
    href: '#',
    icon: InfoCircle,
  },
];

const MoreOptions = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='z-50'>
          <More
            aria-label='More options'
            className='h-5 w-5 rotate-90 text-muted-foreground'
          />
          <ScreenReaderOnly>More options</ScreenReaderOnly>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-4 2xl:mr-0 '>
        <DropdownMenuItem
          onSelect={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}
        >
          {theme === 'light' ? (
            <Moon className='mr-2 h-4 w-4' />
          ) : (
            <Sun1 className='mr-2 h-4 w-4' />
          )}
          <Text>Switch Appearance</Text>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* {tools.map((tool) => (
          <Link href={tool.href} key={tool.label}>
            <DropdownMenuItem>
              <tool.icon className='mr-2 h-4 w-4' aria-label={tool.label} />
              <Text>{tool.label}</Text>
            </DropdownMenuItem>
          </Link>
        ))} */}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {links.map((link) => (
            <Link href={link.href} key={link.label}>
              <DropdownMenuItem>
                <link.icon className='mr-2 h-4 w-4' aria-label={link.label} />
                <Text>{link.label}</Text>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut()}>
          <LogoutCurve className='mr-2 h-4 w-4' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

MoreOptions.displayName = 'MoreOptions';
export default MoreOptions;
