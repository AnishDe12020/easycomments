import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { Formik, Form, ErrorMessage } from "formik"

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()

  return (
    <>
      <Button onClick={onOpen}>{children}</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          initialValues={{ siteName: "", siteUrl: "" }}
          validate={values => {
            const errors = {}
            if (!values.siteName) {
              errors.siteName = "Required"
            }
            if (!values.siteUrl) {
              errors.siteUrl = "Required"
            } else if (
              !/^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/.test(
                values.siteUrl
              )
            ) {
              errors.siteUrl = "Site URL must be a valid URL"
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            setSubmitting(false)
          }}
        >
          {({ isSubmitting, values, handleBlur, handleChange }) => (
            <ModalContent>
              <Form>
                <ModalHeader>Add a Site</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Site Name</FormLabel>
                    <Input
                      ref={initialRef}
                      value={values.siteName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="siteName"
                      placeholder="Enter your site name here"
                    />
                    <ErrorMessage name="siteName" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Site URL</FormLabel>
                    <Input
                      value={values.siteUrl}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter the link to your site here"
                      name="siteUrl"
                    />
                    <ErrorMessage name="siteUrl" />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    mr={3}
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default AddSiteModal
