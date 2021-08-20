import "../styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "@/styles/theme"
import { UserProvider } from "@auth0/nextjs-auth0"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp
