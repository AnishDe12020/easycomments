import { Text, Stack, Flex, useColorModeValue } from "@chakra-ui/react"

const Feature = ({ title, text, icon }) => {
  const textColor = useColorModeValue("gray.700", "gray.300")
  const iconColor = useColorModeValue("black", "white")
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={iconColor}
        rounded={"full"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={textColor}>{text}</Text>
    </Stack>
  )
}

export default Feature
