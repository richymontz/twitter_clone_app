'use client';
import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './apollo'

export default function ApolloContext({ children }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}