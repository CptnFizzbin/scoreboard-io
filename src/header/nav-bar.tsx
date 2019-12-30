import {AppBar, Button, IconButton, Toolbar, Typography} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import {push} from 'connected-react-router';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router';

import './nav-bar.scss';

import {GameMenu} from './game-menu';

export const NavBar:React.FC = () => {
  const dispatch = useDispatch();
  const onPlayersClick = () => dispatch(push('/players'));
  const {pathname} = useLocation();

  return (
    <AppBar position="fixed" className={'nav-bar'}>
      <Toolbar>
        {pathname === '/' ? <GameMenu /> : <BackButton />}
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

export const BackButton:React.FC = () => {
  const dispatch = useDispatch();
  const onButtonClick = () => dispatch(push('/'));

  return (
    <IconButton edge="start" onClick={onButtonClick}>
      <BackIcon />
    </IconButton>
  );
};

export default NavBar;
