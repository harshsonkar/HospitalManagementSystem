import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, EventAvailable, History} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import * as GiIcons from 'react-icons/gi';
import ContactPageIcon from '@mui/icons-material/ContactPage';

// TODO Add user icon and display username
export const mainListItems = (
    <div>
        <Tooltip title="Dashboard">
            <ListItem button component={Link} to="/patient/dashboard">
                <ListItemIcon>
                    <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Tooltip>

        <Tooltip title="Appointments">
            <ListItem button component={Link} to="/patient/appointments">
                <ListItemIcon>
                    <EventAvailable />
                </ListItemIcon>
                <ListItemText primary="Appointments" />
            </ListItem>
        </Tooltip>
        
        <Tooltip title="History">
            <ListItem button component={Link} to="/patient/appointment-history">
                <ListItemIcon>
                    <History />
                </ListItemIcon>
                <ListItemText primary="History" />
            </ListItem>
        </Tooltip>

        <Tooltip title="Contact Us">
            <ListItem button component={Link} to="/patient/contact-us">
                <ListItemIcon>
                    <ContactPageIcon />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
            </ListItem>
        </Tooltip>
    </div>
);
