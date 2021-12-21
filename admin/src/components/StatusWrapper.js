import styled, { useTheme } from "styled-components"

const StatusWrapper = styled.div`
  ${props => {
    const theme = useTheme()
    switch (props.state) {
      case "READY":
        return `color: ${theme.colors.success500}`
      case "ERROR":
        return `color: ${theme.colors.danger500}`
      case "QUEUED":
      case "BUILDING":
        return `color: ${theme.colors.neutral500}`
    }
  }}
`

export default StatusWrapper
