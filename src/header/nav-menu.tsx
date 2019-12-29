import {Divider, IconButton, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {push} from 'connected-react-router';
import React, {SyntheticEvent} from 'react';
import {useDispatch} from 'react-redux';

import './nav-menu.scss';

export const NavMenu:React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const onButtonClick = (event:SyntheticEvent) => setAnchorEl(event.target);
  const onMenuClose = () => setAnchorEl(null);

  return (
    <div>
      <IconButton edge="start" onClick={onButtonClick}>
        <MenuIcon />
      </IconButton>

      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClick={onMenuClose} onClose={onMenuClose}>
        <GamesSubMenu />
        <Divider />
        <PlayersSubMenu />
      </Menu>
    </div>
  );
};

const GamesSubMenu:React.FC = () => {
  const dispatch = useDispatch();
  const onNewGameClick = () => dispatch(push('/games/new'));
  const onRematchClick = () => dispatch({type: 'GAME.REMATCH'});

  return (
    <React.Fragment>
      <MenuLabel>Games</MenuLabel>
      <MenuItem onClick={onNewGameClick}>New Game</MenuItem>
      <MenuItem onClick={onRematchClick}>Rematch</MenuItem>
    </React.Fragment>
  );
};

const PlayersSubMenu:React.FC = () => {
  const dispatch = useDispatch();
  const onListClick = () => dispatch(push('/players'));

  return (
    <React.Fragment>
      <MenuLabel>Players</MenuLabel>
      <MenuItem onClick={onListClick}>List</MenuItem>
    </React.Fragment>
  );
};

const MenuLabel:React.FC = ({children}) => {
  return (
    <div className={'menu-label'}>{children}</div>
  );
};
