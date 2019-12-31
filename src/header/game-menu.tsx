import {IconButton, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, {SyntheticEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Rematch} from '../games/game.actions';

import './nav-menu.scss';
import {RootState} from '../store/root-reducer';

export const GameMenu:React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const players = useSelector((state:RootState) => state.players);

  const onMenuOpen = (event:SyntheticEvent) => setAnchorEl(event.target);
  const onMenuClose = () => setAnchorEl(null);

  const onRematch = () => {
    const firstPlayer = Object.values(players)[0];
    dispatch(Rematch(firstPlayer.id));
  };

  return (
    <div>
      <IconButton edge="start" onClick={onMenuOpen}>
        <MenuIcon />
      </IconButton>

      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClick={onMenuClose} onClose={onMenuClose}>
        <MenuItem onClick={onRematch}>Rematch</MenuItem>
      </Menu>
    </div>
  );
};
