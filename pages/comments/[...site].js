import React from "react"
import { useUser } from "@auth0/nextjs-auth0"
import { Textarea, Button } from "@chakra-ui/react"
import Header from "@/components/Header"
import { useRouter } from "next/dist/client/router"

import { Formik, Form, ErrorMessage } from "formik"

const SiteComments = () => {
  const { user } = useUser()
  const router = useRouter()

  const siteId = router.query.siteId

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
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
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
