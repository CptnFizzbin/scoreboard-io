import {IconButton, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, {SyntheticEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Rematch, SetDealer} from '../games/game.actions';

import './game-menu.scss';
import Player from '../players/player';
import PlayerSelectDialog from '../players/player-select-dialog';
import {RootState} from '../store/root-reducer';

export const GameMenu:React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [playerDialogOpen, setPlayerDialogOpen] = useState<boolean>(false);
  const players = useSelector((state:RootState) => state.players);

  const openMenu = (event:SyntheticEvent) => setAnchorEl(event.target as Element);
  const closeMenu = () => setAnchorEl(null);

  const selectDealer = () => {
    closeMenu();
    setPlayerDialogOpen(true);
  };
  const setDealer = (player:Player) => {
    setPlayerDialogOpen(false);
    dispatch(SetDealer(player?.id));
  };

  const rematch = () => {
    const firstPlayer = Object.values(players)[0];
    dispatch(Rematch(firstPlayer?.id));
  };

  return (
    <div>
      <IconButton edge="start" onClick={openMenu}>
        <MenuIcon />
      </IconButton>

      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClick={closeMenu} onClose={closeMenu}>
        <MenuItem onClick={rematch}>Rematch</MenuItem>
        <MenuItem onClick={selectDealer}>Change Dealer</MenuItem>
      </Menu>

      <PlayerSelectDialog open={playerDialogOpen} onSelect={setDealer}/>
    </div>
  );
};
