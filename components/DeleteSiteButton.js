import { deleteSite } from "@/utils/db"
import { DeleteIcon } from "@chakra-ui/icons"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  IconButton,
  Button,
  useToast,
} from "@chakra-ui/react"
import React, { useState, useRef } from "react"
import { mutate } from "swr"

const DeleteSiteButton = ({ siteId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast()
  const onClose = () => {
    setIsOpen(false)
  }

  const onDeleteConfirm = () => {
    console.log(`Deleting site with id ${siteId}`)
    deleteSite(siteId)
      .then(() => {
        mutate(
          "/api/sites",
          async data => {
            return {
              sites: data.sites.filter(site => site.id !== siteId),
            }
          },
          false
        )

        toast({
          title: "Site Deleted",
          description: "Your site has been deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      })
      .catch(err => {
        console.error(err)
        toast({
          title: "An error occured when deleteing your site",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      })
    onClose()
  }

  const cancelRef = useRef()

  return (
    <>
      <IconButton
        colorScheme="red"
        icon={<DeleteIcon />}
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards. All
              feedback corresponding to this site will also be deleted.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
export default DeleteSiteButton
