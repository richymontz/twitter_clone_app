'use client';
import * as React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Avatar, Button, Typography, TextField, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styled from "styled-components"

import Sidebar from "../components/Sidebar"
import MoreSection from "../components/MoreSection"
import MainContent from "../components/MainContent"
import Tweet from "../components/Tweet"

import { CREATE_TWEET, FEED } from '../graphql/mutators'

const MAX_CHARS = 280

export const Title = styled.h1`
  text-align: left;
  border-bottom: 1px solid #ddd;
  padding: 10px 10px 10px 20px;
`

export const Container = styled.main`
  display: flex;
  flex-direction: row;
  height: 100%;
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
  margin-bottom: 100px;
`

const HomeScreen = () => {
  const router = useRouter()
  const [newTweet, setNewTweet] = React.useState("")


  const { data: feed, loading: loadingFeed, refetch: refetchFeed } = useQuery(FEED)

  const currentUser = JSON.parse(localStorage.getItem("user"))
  const tweets = React.useMemo(() => {
    return currentUser && currentUser.relatedUsers ? currentUser.relatedUsers.map((user) => user.tweets).flat() : []
  }, [currentUser])

  const [createTweet, {data, loading, error}] = useMutation(CREATE_TWEET, {
    onCompleted: (data) => {
      refetchFeed()
      setNewTweet("")
    },
    onError: (error) => {
      console.error('error', error)
    }
  })

  const newTweetHasError = React.useMemo(() => {
    return newTweet.length > MAX_CHARS
  }, [newTweet])

  const onNewTweetChange = React.useCallback((event) => {
    setNewTweet(event.target.value)
  }, [setNewTweet])

  const postNewTweet = React.useCallback(() => {
    createTweet({
      variables: {
        body: newTweet
      }
    })
  }, [createTweet, newTweet])

  React.useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") == "null") {
      router.push("/")
    }
  }, [])

  return (
    <Container>
      <Sidebar currentUser={currentUser}/>
      <MainContent>
        <Title>
          Home
        </Title>
        <CreateTweetContainer>
          <CurrentUserAvatar>
            <Avatar src={currentUser?.avatar} />
          </CurrentUserAvatar>
          <TweetContainer>
            <InputContainer>
              <TextField
                fullWidth
                disabled={loading}
                label="What is happening!?"
                variant='standard'
                multiline
                error={newTweetHasError}
                value={newTweet}
                onChange={onNewTweetChange}
                helperText={newTweetHasError ? `${newTweet.length} / ${MAX_CHARS} characters max` : " "}></TextField>
            </InputContainer>
            <Actions>
              <Button disabled={newTweet.length == 0 || newTweetHasError || loading} variant="contained" onClick={postNewTweet}>Post</Button>
            </Actions>
          </TweetContainer>
        </CreateTweetContainer>
        <Tweets>
          {feed && feed.feed && feed.feed.map((tweet, index) => {
            return (
              <Tweet tweet={tweet} key={`tweet-${index}`}/>
            )
          })}
        </Tweets>
      </MainContent>
      <MoreSection>
        
      </MoreSection>
    </Container>
  )
}

export default HomeScreen