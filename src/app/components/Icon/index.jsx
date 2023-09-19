import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export const toWebIcon = (string, prefix) => {
  return `${prefix}${string.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`
}

export const toAppIcon = (string) => {
  return string.slice(2).split(/(?=[A-Z])/).join('-').toLowerCase()
}

export const Icon = ({name, prefix = "fa", ...props}) => {
  return (
    <FontAwesomeIcon icon={Icons[toWebIcon(name, prefix)]} {...props}/>
  )
}

export default Icon