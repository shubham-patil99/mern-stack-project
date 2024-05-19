import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Profile from './pofile';
import Items from './items';
import LogoutIcon from '@mui/icons-material/Logout';
import Landing from './landing';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ flexGrow: 1, padding: '16px' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ givenName, familyName, email, picture }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for authenticated state
  const [open, setOpen] = useState(false); // State for managing the modal dialog

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    window.location.reload(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '750px' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: '200px' }}
        style={{ background: "#004a94" }}
      >
        <Tab
          icon={<DashboardIcon />}
          iconPosition="start"
          style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#fff", backgroundColor: value === 0 ? '#488bd6' : 'transparent' }}
          label="Dashboard"
          {...a11yProps(0)}
        />
        <Tab
          icon={<PersonIcon />}
          iconPosition="start"
          style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#fff", backgroundColor: value === 1 ? '#488bd6' : 'transparent' }}
          label="My Profile"
          {...a11yProps(1)}
        />
        <Tab
          icon={<InventoryIcon />}
          iconPosition="start"
          style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#fff", backgroundColor: value === 2 ? '#488bd6' : 'transparent' }}
          label="My Items"
          {...a11yProps(2)}
        />
        <Tab
          icon={<LogoutIcon />}
          iconPosition="start"
          style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#fff", backgroundColor: value === 3 ? '#488bd6' : 'transparent' }}
          label="Log Out"
          {...a11yProps(3)}
          onClick={handleClickOpen}
        />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Landing givenName={givenName} familyName={familyName} email={email} picture={picture} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Profile givenName={givenName} familyName={familyName} email={email} picture={picture} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Items />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
      </TabPanel>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleLogout();
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
