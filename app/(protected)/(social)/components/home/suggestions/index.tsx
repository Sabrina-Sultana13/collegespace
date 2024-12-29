import { Flex } from '@/components/layout/flex'

import SiteFooter from '../../layout/site-footer'
import UserSuggestions from './user-suggestions'

const Suggestions = () => {
  return (
    <Flex direction="column" align="center" gap={4} width="full">
      <UserSuggestions />
      <SiteFooter show />
    </Flex>
  )
}

Suggestions.displayName = 'Suggestions'
export default Suggestions
