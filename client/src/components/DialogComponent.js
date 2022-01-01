import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons';
import React from 'react'

const DialogComponent = (props) => {

  const {title,children,openPopup,setOpenPopup} = props;
  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <div style={{display:'flex',alignItems:"center"}}>
          <Typography variant='h6' component="div" style={{flexGrow:1}}>{title}</Typography>
          <IconButton aria-label='close-button' onClick={()=>{setOpenPopup(false)}}><Close color='secondary'/></IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  )
}

export default DialogComponent
