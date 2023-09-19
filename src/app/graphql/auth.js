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
  }
}
`