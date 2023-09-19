import * as React from "react"
import { useRouter } from 'next/navigation'
import { Avatar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styled from "styled-components"

import Icon from "../components/Icon"
import DropdownMenu from "../components/DropdownMenu"

import { destroySession } from '../utils/session'

export const Container = styled.aside`
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px 40px 40px 40px;
  position: fixed;
  width: 500px;
`

export const SidebarTop = styled.div`
  flex: 1;
`

export const SidebarBottom = styled.div`
  display: flex;
  flex-direction: row;
`

export const UserCard = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
`

export default function Sidebar({ currentUser }) {
  const router = useRouter()

  const onLogout = React.useCallback(() => {
    destroySession()
    router.push("/")
  }, [router])

  const goToHome = React.useCallback(() => {
    router.push("/home")
  }, [router])

  const goToProfile = React.useCallback(() => {
    router.push(`/${currentUser.username}`)
  }, [router])

  return (
    <Container>
      <SidebarTop>
        <Typography variant='h4'>Twitter Clone</Typography>
        <List>
          <ListItem>
            <ListItemButton onClick={goToHome}>
              <ListItemIcon>
                <Icon name="Home" />
              </ListItemIcon>
              <ListItemText primary="Home" variant="h4" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={goToProfile}>
              <ListItemIcon>
                <Icon name="person" />
              </ListItemIcon>
              <ListItemText primary="Profile" variant="h4" />
            </ListItemButton>
          </ListItem>
        </List>
      </SidebarTop>
      <SidebarBottom>
        <UserCard>
          <Avatar src={currentUser.avatar} />
          <Typography variant='h6' style={{ marginLeft: 20 }}>{currentUser.username}</Typography>
        </UserCard>
        <DropdownMenu items={[{ label: 'Log out', onClick: onLogout }]}/>
      </SidebarBottom>
    </Container>
  )
}