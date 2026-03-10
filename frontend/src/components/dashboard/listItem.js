import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { Info } from '@mui/icons-material';
import * as React from 'react';

// TODO Add user icon and display username

export const secondaryListItems = (
    <div>
        
        <Tooltip title="Info">
            <ListItem button className="flex-end">
                <ListItemIcon>
                    <Info />
                </ListItemIcon>
                <ListItemText primary="Info" />
            </ListItem>
        </Tooltip>
        
    </div>
);