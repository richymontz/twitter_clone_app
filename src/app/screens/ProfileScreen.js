'use client';
import * as React from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { Avatar, Button, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styled from "styled-components"

import Sidebar from "../components/Sidebar"
import MoreSection from "../components/MoreSection"
import MainContent from "../components/MainContent"

import { LOGIN } from '../graphql/mutators'

export const Title = styled.h1`
  text-align: center;
`

export const Container = styled.main`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

const ProfileScreen = ({ username }) => {
  const router = useRouter()

  const currentUser = React.useMemo(() => {
    return JSON.parse(localStorage.getItem("user"))
  }, [localStorage])

  React.useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") == "null") {
      router.push("/")
    }
  }, [])

  return (
    <Container>
      <Sidebar currentUser={currentUser}/>
      <MainContent>
        Profile for: {username}
      </MainContent>
      <MoreSection>
        More
      </MoreSection>
    </Container>
  )
}

export default ProfileScreen