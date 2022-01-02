import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons';
import React from 'react'

const DialogComponentPassword = (props) => {

  const {title,children,openPasswordPopup,setOpenPasswordPopup} = props;
  return (
    <Dialog open={openPasswordPopup}>
      <DialogTitle>
        <div style={{display:'flex',alignItems:"center"}}>
          <Typography variant='h6' component="div" style={{flexGrow:1}}>{title}</Typography>
          <IconButton aria-label='close-button' onClick={()=>{setOpenPasswordPopup(false)}}><Close color='secondary'/></IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  )
}

export default DialogComponentPassword