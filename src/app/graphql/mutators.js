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

export const REGISTER = gql`
mutation Register($username: String!, $password: String!, $fullName: String!, $email: String!){
  register(
    input:{
      username: $username,
      password: $password,
      fullName: $fullName,
      email: $email,
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
mutation CreateTweet($body: String!){
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