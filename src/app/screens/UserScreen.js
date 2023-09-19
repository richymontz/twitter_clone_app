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
import Tweet from "../components/Tweet"

import { FOLLOW_USER, UNFOLLOW_USER, USER_INFO } from '../graphql/mutators'

const MAX_CHARS = 280

export const Title = styled.h1`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

export const UserCard = styled(Link)`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`

export const UserName = styled.div`
  margin-left: 10px;
`

export const Users = styled.div`
  padding: 20px;
`

const UserScreen = ({ username }) => {
  const router = useRouter()

  const currentUser = JSON.parse(localStorage.getItem("user"))
  const { data, loading, error } = useQuery(USER_INFO, {
    variables: { username },
    onCompleted: (data) => {
      if (data.userInfo.username == currentUser.username) {
        localStorage.setItem("user", JSON.stringify(data.userInfo))
      }
    }
  })
  const viewingUser = React.useMemo(() => {
    return data?.userInfo
  }, [data])
  const tweets = React.useMemo(() => {
    return viewingUser ? viewingUser.tweets : []
  }, [viewingUser])
  const userIsFollowed = React.useMemo(() => {
    return currentUser && viewingUser && currentUser.followingIds.includes(viewingUser.id)
  }, [currentUser, viewingUser])

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

  const toggleFollow = React.useCallback(() => {
    if (userIsFollowed) {
      unfollowUser({
        variables: {
          toId: parseInt(viewingUser.id)
        }
      })
    } else {
      followUser({
        variables: {
          toId: parseInt(viewingUser.id)
        }
      })
    }
  }, [viewingUser, userIsFollowed, unfollowUser, followUser])

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
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Avatar src={viewingUser.avatar} style={{ marginRight: 20 }}/>
            <UserName href={`/${viewingUser.username}`}>{viewingUser.fullName} (@{viewingUser.username})</UserName>
          </div>
          {data.userInfo.username != currentUser.username && (
            <Button disabled={followUserResponse.loading} onClick={toggleFollow} variant={userIsFollowed ? "outlined" : "contained"}>{userIsFollowed ? "Unfollow" : "Follow"}</Button>
          )}
        </Title>
        <Tweets>
          {tweets.length == 0 && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>This user has no tweets</div>
          )}
          {tweets.map((tweet, index) => {
            return <Tweet tweet={tweet} key={`tweet-${tweet.id}`}/>
          })}
        </Tweets>
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

export default UserScreen