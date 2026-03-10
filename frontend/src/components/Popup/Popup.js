import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import Controls from '../Controls/Controls';
import CloseIcon from '@mui/icons-material/Close';

import useStyles from './style'

function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;

    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow: 1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton 
                        color="secondary"
                        onClick={() => {setOpenPopup(false)}}
                    >
                            <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup