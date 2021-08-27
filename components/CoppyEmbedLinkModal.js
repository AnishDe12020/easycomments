import { CopyIcon } from "@chakra-ui/icons"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Button,
  Input,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useState } from "react"

const CopyEmbedLinkModal = ({ site }) => {
  const [route, setRoute] = useState("/")
  const [preferredColorMode, setPreferredColorMode] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleRouteChanged = e => {
    setRoute(e.target.value)
  }

  const handleColorModeChange = e => {
    setPreferredColorMode(e.target.value)
  }

  return (
    <>
      <Button onClick={onOpen}>See Embed URL</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{site.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody m={2}>
            <Input name="route" value={route} onChange={handleRouteChanged} />
            <Select mt={2} name="colorMode" onChange={handleColorModeChange}>
              <option value="">No preferred color mode</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>

            <Flex mt={4}>
              <Input
                value={`https://easycomments.anishde.dev/embed/${
                  site.id
                }${route}${
                  preferredColorMode ? "?colorMode=" + preferredColorMode : ""
                }`}
                readOnly
              />
              <IconButton ml={2} icon={<CopyIcon />} />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CopyEmbedLinkModal
