import React from "react"
import { useUser } from "@auth0/nextjs-auth0"
import { Textarea, Button, useToast } from "@chakra-ui/react"
import Header from "@/components/Header"
import { useRouter } from "next/dist/client/router"

import { Formik, Form, ErrorMessage } from "formik"
import { addComment } from "@/utils/db"

const SiteComments = () => {
  const { user } = useUser()
  const router = useRouter()

  const tmp = router.query.site
  const [siteId, route] = tmp

  const toast = useToast()

  const handleLoginClick = e => {
    e.preventDefault()
    router.push("/api/auth/login")
  }

  return (
    <>
      <Header />
      {user ? (
        <Formik
          initialValues={{ comment: "" }}
          validate={values => {
            const errors = {}
            if (!values.comment) {
              errors.comment = "Required"
            }

            return errors
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const newComment = {
              siteId,
              route: route || "/",
              authorName: user.given_name + " " + user.family_name,
              authorEmail: user.email,
              comment: values.comment,
              createdAt: new Date().toISOString(),
              status: "pending",
            }

            console.log(newComment)

            addComment(newComment)
              .then(
                toast({
                  title: "Comment added",
                  description: "Your comment has been successfully added",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              )
              .catch(error => {
                console.error(error)
                toast({
                  title: "An error occured when adding your comment",
                  description: error.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
              })
            setSubmitting(false)
          }}
        >
          {({ isSibmitting, handleChange, handleBlur }) => (
            <Form>
              <Textarea
                placeholder="Write a comment..."
                onChange={handleChange}
                onBlur={handleBlur}
                name="comment"
              />
              <ErrorMessage name="comment" />
              <Button type="submit" isLoading={isSibmitting}>
                Leave a Comment
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <Button onClick={handleLoginClick}>Log in to leave a comment</Button>
      )}
    </>
  )
}

export default SiteComments
