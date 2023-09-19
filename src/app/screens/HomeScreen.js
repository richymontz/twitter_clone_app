'use client';
import * as React from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Avatar, Button, Typography, TextField } from '@mui/material';
import styled from "styled-components"

import Sidebar from "../components/Sidebar"
import MoreSection from "../components/MoreSection"
import MainContent from "../components/MainContent"

import { CREATE_TWEET } from '../graphql/mutators'

const MAX_CHARS = 280

export const Title = styled.h1`
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

const HomeScreen = () => {
  const router = useRouter()
  const [newTweet, setNewTweet] = React.useState("")

  const currentUser = JSON.parse(localStorage.getItem("user"))
  const tweets = JSON.parse(localStorage.getItem("tweets"))

  const [createTweet, {data, loading, error}] = useMutation(CREATE_TWEET, {
    onCompleted: (data) => {
      localStorage.setItem("tweets", JSON.stringify([data.createTweet, ...tweets]))
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
  }, [])

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
          {tweets.map((tweet, index) => {
            return (
              <Tweet>
                <Avatar src={tweet.user.avatar} />
                <TweetContent>
                  <TweetHeader>
                    <Link href={`/${tweet.user.username}`}><strong>{tweet.user.fullName}</strong>, @{tweet.user.username} - {tweet.dateTime}</Link>
                  </TweetHeader>
                  <TweetBody>{tweet.body}</TweetBody>
                </TweetContent>
              </Tweet>
            )
          })}
        </Tweets>
      </MainContent>
      <MoreSection>
        More
      </MoreSection>
    </Container>
  )
}

export default HomeScreen