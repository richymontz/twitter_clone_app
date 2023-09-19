'use client';
import * as React from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { TextField, Button } from '@mui/material';
import styled from "styled-components"

import { LOGIN } from '../graphql/auth'

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

const HomeScreen = () => {
  const router = useRouter()

  const onLogout = React.useCallback(() => {
    localStorage.setItem('token', null)
    router.push("/")
  }, [])

  React.useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") == "null") {
      router.push("/")
    }
  }, [])

  return (
    <Container>
      <Box>
        Home screen
        <div>
          Token: {localStorage.getItem('token')}
        </div>
        <Button variant='contained' style={{ marginTop: 20 }} onClick={onLogout}>Logout</Button>
      </Box>
    </Container>
  )
}

export default HomeScreen