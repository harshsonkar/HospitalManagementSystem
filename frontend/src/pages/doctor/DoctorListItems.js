import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Dashboard, EventAvailable } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import * as GiIcons from 'react-icons/gi';


// TODO Add user icon and display username
export const mainListItems = (
    <div>
        
        <Tooltip title="Dashboard">
            <ListItem button component={Link} to="/doctor/dashboard">
                <ListItemIcon>
                    <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Tooltip>
        
        <Tooltip title="Appointments">
            <ListItem button component={Link} to="/doctor/appointments">
                <ListItemIcon >
                    <EventAvailable />
                </ListItemIcon>
                <ListItemText primary="Appointments" />
            </ListItem>
        </Tooltip>

        <Tooltip title="Patient Admitted">
            <ListItem button component={Link} to="/doctor/admitted">
                <ListItemIcon >
                    <GiIcons.GiBed className="reactIcon" />
                </ListItemIcon>
                <ListItemText primary="Pateint Admitted" />
            </ListItem>
        </Tooltip>
        <Tooltip title="Reviews">
            <ListItem button component={Link} to="/doctor/reviews">
                <ListItemIcon >
                    <GiIcons.GiRoundStar className="reactIcon" />
                </ListItemIcon>
                <ListItemText primary="Reviews" />
            </ListItem>
        </Tooltip>
    </div>
);

/* export const secondaryListItems = (
    <div>
        <Tooltip title="Logout">
            <ListItem button className="flex-end">
            <ListItemIcon>
                <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
            </ListItem>
        </Tooltip>
    </div>
);
 */