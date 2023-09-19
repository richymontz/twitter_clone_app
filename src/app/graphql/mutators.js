import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation Login($username: String!, $password: String!){
  login(
    input:{
      username: $username,
      password: $password
    }
  ){
    id
    username
    email
    token
    avatar
    followerIds
    followingIds
    fullName
    relatedUsers {
      id
      username
      avatar
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
    id
    username
    email
    token
    avatar
    followerIds
    followingIds
    fullName
    relatedUsers {
      id
      username
      avatar
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
    tweets {
      id
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
    id
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

export const FOLLOW_USER = gql`
mutation FollowUser($toId: Int!){
  followUser(
    input:{
      toId: $toId
    }
  ){
    fromUserId
    toUserId
  }
}
`

export const UNFOLLOW_USER = gql`
mutation UnfollowUser($toId: Int!){
  unfollowUser(
    input:{
      toId: $toId
    }
  ){
    fromUserId
    toUserId
  }
}
`

export const USER_INFO = gql`
query UserInfo($username: String!) {
  userInfo(
    username: $username
  ){
    id
    username
    email
    token
    avatar
    followerIds
    followingIds
    fullName
    relatedUsers {
      id
      username
      avatar
      fullName
    }
    tweets {
      id
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

export const FEED = gql`
query Feed {
  feed {
    id
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
`