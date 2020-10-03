import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 500;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  toolbar: theme.mixins.toolbar,
}));

const RightMenu = ({ children }) => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setToggle(open);
  };

  return (
    <React.Fragment>
      <Hidden smUp implementation="css">
        <SwipeableDrawer
          className={classes.swipeableDrawer}
          anchor={'right'}
          open={toggle}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {children}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer variant="permanent" anchor="right">
          <div className={classes.toolbar} />
          <Divider />
          {children}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export default RightMenu;
