import {AppBar, Avatar, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import {Add, Apps} from '@mui/icons-material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, {useState} from 'react';
import CreateClass from '../CreateClass/CreateClass';
import JoinClass from '../JoinClass/JoinClass';
import {dialogActions} from '@/redux/feature/dialog/slice';
import {authActions} from '@/redux/feature/auth/slice';
import {useStyles} from './style';
import {useAppSelector, useAppDispatch} from '@/redux';
import {useNavigate, useLocation} from 'react-router-dom';
import {ClassModel} from '@/models/class';
import CreatePresentation from '../CreatePresentation/CreatePresentation';

interface Props {
  children: JSX.Element;
  classData?: ClassModel;
}

const Header = ({children, classData}: Props) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatcher = useAppDispatch();
  const [showOption, setShowOption] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [valueTab, setValueTab] = React.useState(location.pathname.includes('member') ? 'member' : 'new');
  const loggedInUser = useAppSelector(state => state.auth.isLoggedIn);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCreate = () => {
    handleClose();
    dispatcher(dialogActions.openCreateClassDialog());
  };

  const handleCreatePresentation = () => {
    handleClose();
    dispatcher(dialogActions.openCreatePresentationDialog());
  };

  const handleJoin = () => {
    handleClose();
    dispatcher(dialogActions.openJoinClassDialog());
  };

  const handleClickNews = () => {
    navigate(`/class/${classData?.uuid}`);
  };

  const handleClickMembers = () => {
    navigate(`/class/${classData?.uuid}/member`);
  };

  const handleViewProfile = () => {
    navigate('/myprofile');
  };

  const handleLogout = () => {
    dispatcher(authActions.logout());
    navigate(`/`);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          {classData ? (
            <>
              <div className={classes.headerWrapper}>
                {children}
                <div className={classes.headerClass}>
                  <Typography variant="h6" className={classes.title1}>
                    {classData.name}
                  </Typography>
                  <h6 style={{margin: 0}}>{classData.subject}</h6>
                </div>
              </div>
              <div>
                <Box sx={{width: '100%'}}>
                  <Tabs
                    value={valueTab}
                    onChange={handleChange}
                    textColor="inherit"
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: '#D97D54',
                      },
                    }}
                    aria-label="nav tabs example">
                    <Tab value="new" label="Bảng tin" onClick={handleClickNews} />
                    <Tab value="member" label="Mọi người" onClick={handleClickMembers} />
                  </Tabs>
                </Box>
              </div>
            </>
          ) : (
            <div className={classes.headerWrapper}>
              {children}
              <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" alt="Classroom" />
              <Typography variant="h6" className={classes.title1}>
                Classroom
              </Typography>
            </div>
          )}

          <div className={classes.header__wrapper__right}>
            {!classData && <Add onClick={handleClick} className={classes.icon} />}
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
              <MenuItem onClick={handleCreatePresentation}>Create New Presentation</MenuItem>
            </Menu>
            <div style={{position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
              <Avatar onClick={() => setShowOption(!showOption)} className={classes.icon} />
              {showOption ? (
                <div className={classes.optionsCtn}>
                  <div className={classes.option} onClick={handleViewProfile}>
                    Profiles
                  </div>
                  <div className={classes.option} onClick={handleLogout}>
                    Log out
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass />
      <JoinClass />
      {/* <CreatePresentation/> */}
    </div>
  );
};

export default Header;
