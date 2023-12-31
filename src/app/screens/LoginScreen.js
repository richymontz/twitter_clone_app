'use client';
import * as React from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { TextField, Button } from '@mui/material';
import styled from "styled-components"

import { LOGIN } from '../graphql/mutators'
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

export const Error = styled.div`
  color: red;
  margin-top: 10px;
`

const LoginScreen = () => {
  const router = useRouter()
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [setLogin, {data, loading, error}] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setupSession(data.login)
      router.push(`/home`)
    },
    onError: (error) => {
      console.log('error', error)
    }
  })

  const onUsernameChange = React.useCallback((event) => {
    setUsername(event.target?.value)
  }, [setUsername])

  const onPasswordChange = React.useCallback((event) => {
    setPassword(event.target?.value)
  }, [setPassword])

  const onLogin = React.useCallback(() => {
    setLogin({
      variables: {
        username,
        password
      }
    })
  }, [setLogin, username, password])

  const onRegister = React.useCallback(() => {
    router.push("/register")
  }, [router])

  return (
    <Container>
      <Box>
        <Title>Twitter Clone</Title>
        <TextField label="Username" disabled={loading} required fullWidth variant="outlined" style={{ marginTop: 20 }} value={username} onChange={onUsernameChange}/>
        <TextField label="Password" disabled={loading} type="password" required fullWidth variant="outlined" style={{ marginTop: 20 }} value={password} onChange={onPasswordChange}/>
        {error && (
          <Error>
            {error.message}
          </Error>
        )}
        <Button disabled={loading || (username.length == 0 || password.length == 0)} variant='contained' style={{ marginTop: 20 }} onClick={onLogin}>Login</Button>
        <Button variant='text' style={{ marginTop: 20 }} onClick={onRegister}>Register</Button>
      </Box>
    </Container>
  )
}

export default LoginScreen