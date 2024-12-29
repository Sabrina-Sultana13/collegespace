import React from 'react'

import { Flex } from '@/components/layout/flex'

import SiteFooter from './components/layout/site-footer'
import SiteHeader from './components/layout/site-header'

interface SocialLayoutProps {
  children: React.ReactNode
}

const SocialLayout = ({ children }: SocialLayoutProps) => {
  return (
    <Flex position="relative" direction="column" className="min-h-screen">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </Flex>
  )
}

export default SocialLayout
