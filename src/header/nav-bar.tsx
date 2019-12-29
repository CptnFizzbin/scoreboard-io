import {AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch} from 'react-redux';

import './nav-bar.scss';

import {NavMenu} from './nav-menu';

export const NavBar:React.FC = () => {
  const dispatch = useDispatch();
  const onPlayersClick = () => dispatch(push('/players'));

  return (
    <AppBar position="static" className={'nav-bar'}>
      <Toolbar>
        <NavMenu />
        <Typography variant="h6" className={'title'}>
          Scoreboard-io
        </Typography>
        <Button onClick={onPlayersClick}>
          Players
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
