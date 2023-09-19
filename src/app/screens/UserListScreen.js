'use client';
import * as React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Avatar, Button, CircularProgress, Typography, TextField, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styled from "styled-components"

import Sidebar from "../components/Sidebar"
import MoreSection from "../components/MoreSection"
import MainContent from "../components/MainContent"
import Icon from "../components/Icon"

import { USER_INFO, FOLLOW_USER, UNFOLLOW_USER } from '../graphql/mutators'

const MAX_CHARS = 280

export const Title = styled.h1`
  display: flex;
  flex-direction: row;
  text-align: left;
  border-bottom: 1px solid #ddd;
  padding: 10px 10px 10px 20px;
`

export const Container = styled.main`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

export const CreateTweetContainer = styled.div`
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  padding: 20px;
`

export const CurrentUserAvatar = styled.div`
  margin-right: 20px;
`

export const TweetContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const InputContainer = styled.div`
  
`

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const Tweet = styled.div`
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  padding: 30px;
`

export const TweetContent = styled.div`
  margin-left: 10px;
`

export const TweetHeader = styled.div`
  font-size: 1.2em;
`

export const TweetBody = styled.div`
  color: #ddd;
  font-size: 1.2em;
  word-break: break-word;
`

export const UserCard = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`

export const UserName = styled(Link)`
  margin-left: 10px;
`

export const Users = styled.div`
  padding: 20px;
`

const UserListScreen = ({ listType, username, subtitle }) => {
  const router = useRouter()

  const currentUser = JSON.parse(localStorage.getItem("user"))
  const { data, loading, error } = useQuery(USER_INFO, { variables: { username } })
  const viewingUser = React.useMemo(() => {
    return data?.userInfo
  }, [data])

  const userIds = React.useMemo(() => {
    return viewingUser ? viewingUser[listType] : []
  }, [viewingUser])

  const [followUser, followUserResponse] = useMutation(FOLLOW_USER, {
    onCompleted: (data) => {
      localStorage.setItem("user", JSON.stringify({
        ...currentUser,
        followingIds: [...currentUser.followingIds, data.followUser.toUserId]
      }))
    },
    onError: (error) => {
      console.error('error', error)
    }
  })

  const [unfollowUser, unfollowUserResponse] = useMutation(UNFOLLOW_USER, {
    onCompleted: (data) => {
      const index = currentUser.followingIds.indexOf(viewingUser.id)

      localStorage.setItem("user", JSON.stringify({
        ...currentUser,
        followingIds: [...currentUser.followingIds.slice(0, index), ...currentUser.followingIds.slice(index + 1)]
      }))
    },
    onError: (error) => {
      console.error('error', error)
    }
  })

  const goToFollowing = React.useCallback(() => {
    router.push(`/${viewingUser.username}/following`)
  }, [router, viewingUser])

  const goToFollowers = React.useCallback(() => {
    router.push(`/${viewingUser.username}/followers`)
  }, [router, viewingUser])

  const toggleFollow = React.useCallback((userIsFollowed, user_id) => {
    return () => {
      if (userIsFollowed) {
        unfollowUser({
          variables: {
            toId: parseInt(user_id)
          }
        })
      } else {
        followUser({
          variables: {
            toId: parseInt(user_id)
          }
        })
      }
    }
  }, [viewingUser, unfollowUser, followUser])

  React.useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") == "null") {
      router.push("/")
    }
  }, [])

  if (!viewingUser) {
    return <CircularProgress size="lg" />
  }

  return (
    <Container>
      <Sidebar currentUser={currentUser}/>
      <MainContent>
        <Title>
          <Avatar src={viewingUser.avatar} style={{ marginRight: 20 }}/>{viewingUser.fullName} - {subtitle}
        </Title>
        <Users>
          {viewingUser.relatedUsers.filter((user) => {
            return userIds.includes(user.id)
          }).map((user) => {
            const userIsFollowed = currentUser.followingIds.includes(user.id)

            return (
              <UserCard key={`user-${user.username}`}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flex: 1 }}>
                  <Avatar src={user.avatar}/>
                  <UserName href={`/${user.username}`}>{user.fullName} (@{user.username})</UserName>
                </div>
                <div>
                  {currentUser.id != user.id && (
                    <Button disabled={followUserResponse.loading} onClick={toggleFollow(userIsFollowed, user.id)} variant={userIsFollowed ? "outlined" : "contained"}>{userIsFollowed ? "Unfollow" : "Follow"}</Button>
                  )}
                </div>
              </UserCard>
            )
          })}
        </Users>
      </MainContent>
      <MoreSection>
        <List>
          <ListItem>
            <ListItemButton onClick={goToFollowers}>
              <ListItemIcon>
                <Icon name="people-group" />
              </ListItemIcon>
              <ListItemText primary={`Followers: ${viewingUser.followerIds.length}`} variant="h3" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={goToFollowing}>
              <ListItemIcon>
                <Icon name="person-burst" />
              </ListItemIcon>
              <ListItemText primary={`Following: ${viewingUser.followingIds.length}`} variant="h3" />
            </ListItemButton>
          </ListItem>
        </List>
      </MoreSection>
    </Container>
  )
}

export default UserListScreen