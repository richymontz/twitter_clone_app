import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation Login($username: String!, $password: String!){
  login(
    input:{
      username: $username,
      password: $password
    }
  ){
    username
    email
    token
    avatar
    followerIds
    followingIds
    fullName
    tweets {
      body
      createdAt
      updatedAt
      dateTime
      user {
        username
        avatar
        fullName
      }
    }
  }
}
`

export const CREATE_TWEET = gql`
mutation Login($body: String!){
  createTweet(
    input:{
      body: $body
    }
  ){
    body
    dateTime
    user {
      username
      avatar
      fullName
    }
  }
}
`