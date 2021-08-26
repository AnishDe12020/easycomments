import { Box, Link } from "@chakra-ui/react"
import React from "react"

const CommentsLink = ({ paths }) => (
  <Box mb={8} mt={2} ml={2}>
    <Link fontWeight="bold" fontSize="sm" target="_blank">
      Leave a Comment
    </Link>
  </Box>
)
export default CommentsLink
