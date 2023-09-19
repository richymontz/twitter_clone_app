import * as React from "react"
import { Button, Menu, MenuItem } from "@mui/material"
import Icon from "../Icon"

export const DropdownMenu = ({className, style, items, ...rest}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = React.useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = React.useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const onMenuItemClick = React.useCallback((onMenuItemClick) => {
    return () => {
      onMenuItemClick()
      handleClose()
    }
  }, [handleClose])

  return (
    <div className={className} style={style}>
      <Button
        color="primary"
        id="menu-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}><Icon name="ellipsis-vertical" size="lg"/></Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        {...rest}
      >
        {items.map(({label, onClick}, index) => {
          return <MenuItem key={`menu-item-${index}`} onClick={onMenuItemClick(onClick)}>{label}</MenuItem>
        })}
      </Menu>
    </div>
  )
}

export default DropdownMenu