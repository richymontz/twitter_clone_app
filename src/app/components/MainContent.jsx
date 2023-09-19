import * as React from "react"
import styled from "styled-components"

export const Container = styled.section`
  border-right: 1px solid #ddd;
  width: 600px;
  min-height: 100vh;
  margin-left: 500px;
  height: 100%;
`

export default function MainContent({ children }) {
  return (
    <Container>
      {children}
    </Container>
  )
}