import { Anchor, Group, Stack, Text } from '@mantine/core'

import DietResultFooterAnimation from './DietResultFooterAnimation'
import DietSettings from './DietSettings'
import DietThemeSwitch from './DietThemeSwitch'
import MealLibrary from './MealLibrary'

export default function DietResultFooter() {
  return (
    <DietResultFooterAnimation>
      <Stack gap="md" mt="xs">
        <Group gap="lg">
          <DietSettings />
          <MealLibrary />
          <DietThemeSwitch />
        </Group>
        <Text size="xs" ta="center">
          © 2026
          <Anchor pl="xs" href="https://nathansoftware.ca" target="_blank">
            Nathan Software
          </Anchor>
        </Text>
      </Stack>
    </DietResultFooterAnimation>
  )
}
