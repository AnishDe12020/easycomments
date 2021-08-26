import { Box, Link } from "@chakra-ui/react"
import React from "react"

const CommentsLink = ({ paths }) => (
  <Box mb={8} mt={2} ml={2}>
    <Link
      fontWeight="bold"
      fontSize="sm"
      target="_blank"
      href={`/comments/${paths.join("/")}`}
    >
      Leave a Comment &#10230;
    </Link>
  </Box>
)
export default CommentsLink
