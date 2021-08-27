import { CopyIcon } from "@chakra-ui/icons"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Input,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useState } from "react"

const CopyEmbedLinkModal = ({ site }) => {
  const [route, setRoute] = useState("/")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleChange = e => {
    setRoute(e.target.value)
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
            <Input name="route" value={route} onChange={handleChange} />

            <Flex mt={4}>
              <Input
                value={`https://easycomments.anishde.dev/${site.id}${route}`}
              />
              <IconButton variant="ghost" icon={<CopyIcon />} />
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
