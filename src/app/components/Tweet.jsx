import * as React from "react"
import Link from 'next/link'
import { Avatar } from "@mui/material"
import styled from "styled-components"

export const Container = styled.div`
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

export default function Tweet({ tweet, className, style }) {
  if (!tweet || !tweet.user) {
    return (
      <div>Undefined tweet</div>
    )
  }
  return (
    <Container className={className} style={style}>
      <Avatar src={tweet.user.avatar} />
      <TweetContent>
        <TweetHeader>
          <Link href={`/${tweet.user.username}`}><strong>{tweet.user.fullName}</strong>, @{tweet.user.username} - {tweet.dateTime}</Link>
        </TweetHeader>
        <TweetBody>{tweet.body}</TweetBody>
      </TweetContent>
    </Container>
  )
}