import {IconButton, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {push} from 'connected-react-router';
import React, {SyntheticEvent} from 'react';
import {useDispatch} from 'react-redux';

import './nav-menu.scss';

export const NavMenu:React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const onButtonClick = (event:SyntheticEvent) => setAnchorEl(event.target);
  const onMenuClose = () => setAnchorEl(null);
  const onNewGameClick = () => dispatch(push('/games/new'));
  const onRematchClick = () => dispatch({type: 'GAME.REMATCH'});

  return (
    <div>
      <IconButton edge="start" onClick={onButtonClick}>
        <MenuIcon />
      </IconButton>

      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClick={onMenuClose} onClose={onMenuClose}>
        <MenuItem onClick={onNewGameClick}>New Game</MenuItem>
        <MenuItem onClick={onRematchClick}>Rematch</MenuItem>
      </Menu>
    </div>
  );
};
