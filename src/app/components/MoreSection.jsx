import * as React from "react"
import styled from "styled-components"

export const Container = styled.section`
  height: 100%;
`

export default function MoreSection({ children }) {
  return (
    <Container>
      {children}
    </Container>
  )
}