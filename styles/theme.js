import { extendTheme } from "@chakra-ui/react"
import Link from "@/styles/components/Link"

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

const components = {
  Link,
}

const theme = extendTheme({ config, components })

export default theme
