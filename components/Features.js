import { Box, SimpleGrid, Icon } from "@chakra-ui/react"
import Feature from "@/components/Feature"

const Features = props => {
  const features = [
    {
      id: 1,
      title: "Free and Open Source",
      text: "Easycomments is free to use and the source code is available, publicly in its GitHub Repository.",
    },
    {
      id: 2,
      title: "No trackers\nNo ads",
      text: "We don't track you or your visitors. We also don't use tools like Google Analytics which uses quite a bit of trackers to track the visitors on a site.",
    },
    {
      id: 3,
      title: "Easy to use",
      text: "The main goal of the project was to make it as easy to use as possible. Just sign up, add a site, copy the embed url and create a iframe or an IframeResizer component on your site and start receiving comments!!!",
    },
    {
      id: 4,
      title: "Comment moderation",
      text: "We want the internet to be a friendly place without unnecessary spam and bad comments so we give you the power to approve and remove comments.",
    },
  ]

  return (
    <Box p={4} {...props}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {features.map(feature => (
          <Feature key={feature.id} title={feature.title} text={feature.text} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Features
