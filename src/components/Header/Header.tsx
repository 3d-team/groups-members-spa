import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Add, Apps } from "@mui/icons-material";
import React from "react";
import CreateClass from "../CreateClass/CreateClass";
import JoinClass from "../JoinClass/JoinClass";
import { dialogActions } from '@/redux/feature/dialog/slice';
import { authActions } from '@/redux/feature/auth/slice';
import { useStyles } from "./style";
import { useAppSelector, useAppDispatch } from '@/redux';

type Props = { 
  children: JSX.Element,
};

const Header = ({ children }: Props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatcher = useAppDispatch();

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const loggedInUser = useAppSelector(state => state.auth.isLoggedIn);

  const handleCreate = () => {
    handleClose();
    dispatcher(dialogActions.openCreateClassDialog());
  };

  const handleJoin = () => {
    handleClose();
    dispatcher(dialogActions.openJoinClassDialog());
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            {children}
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
              alt="Classroom"
            />
            <Typography variant="h6" className={classes.title}>
              Classroom
            </Typography>
          </div>
          <div className={classes.header__wrapper__right}>
            <Add onClick={handleClick} className={classes.icon} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
            <div>
              <Avatar
                onClick={() => dispatcher(authActions.logout())}
                className={classes.icon}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass />
      <JoinClass />
    </div>
  );
};

export default Header;