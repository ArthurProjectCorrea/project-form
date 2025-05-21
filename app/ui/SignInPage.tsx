'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'

export default function SignInPage() {
  return (
    <SignIn.Root>
      <SignIn.Step name="start">
        <Clerk.Field name="identifier">
          <Clerk.Label>Email</Clerk.Label>
          <Clerk.Input />
          <Clerk.FieldError />
        </Clerk.Field>
        <SignIn.Action submit>Entrar</SignIn.Action>
      </SignIn.Step>
    </SignIn.Root>
  )
}