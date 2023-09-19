'use client';
import * as React from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { TextField, Button } from '@mui/material';
import styled from "styled-components"

import { REGISTER } from '../graphql/mutators'
import { setupSession } from '../utils/session'

export const Title = styled.h1`
  text-align: center;
`

export const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 300px;
  width: 100%;
`

const RegisterScreen = () => {
  const router = useRouter()
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [register, {data, loading, error}] = useMutation(REGISTER, {
    onCompleted: (data) => {
      setupSession(data.register)
      router.push(`/home`)
    },
    onError: (error) => {
      console.log('error', error)
    }
  })

  const goToLogin = React.useCallback(() => {
    router.push("/")
  }, [router])

  const onUsernameChange = React.useCallback((event) => {
    setUsername(event.target?.value)
  }, [setUsername])

  const onPasswordChange = React.useCallback((event) => {
    setPassword(event.target?.value)
  }, [setPassword])

  const onFullNameChange = React.useCallback((event) => {
    setFullName(event.target?.value)
  }, [setFullName])

  const onEmailChange = React.useCallback((event) => {
    setEmail(event.target?.value)
  }, [setEmail])

  const onRegister = React.useCallback(() => {
    register({
      variables: {
        username,
        password,
        fullName,
        email
      }
    })
  }, [register, username, password, fullName, email])

  return (
    <Container>
      <Box>
        <Title>Register to Twitter Clone</Title>
        <TextField label="Username" disabled={loading} required fullWidth variant="outlined" style={{ marginTop: 20 }} value={username} onChange={onUsernameChange}/>
        <TextField label="Password" disabled={loading} type="password" required fullWidth variant="outlined" style={{ marginTop: 20 }} value={password} onChange={onPasswordChange}/>
        <TextField label="Full Name" disabled={loading} required fullWidth variant="outlined" style={{ marginTop: 20 }} value={fullName} onChange={onFullNameChange}/>
        <TextField label="Email" disabled={loading} required fullWidth variant="outlined" style={{ marginTop: 20 }} value={email} onChange={onEmailChange}/>
        <Button disabled={loading || (username.length == 0 || password.length == 0 || fullName.length == 0 || email.length == 0)} variant='contained' style={{ marginTop: 20 }} onClick={onRegister}>Submit</Button>
        <Button variant='text' style={{ marginTop: 20 }} onClick={goToLogin}>Back to Login</Button>
      </Box>
    </Container>
  )
}

export default RegisterScreen