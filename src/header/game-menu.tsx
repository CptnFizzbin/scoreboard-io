import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, {SyntheticEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import GameSettings from '../games/game-settings';
import {Rematch, SetDealer} from '../games/game.actions';
import Player from '../players/player';
import PlayerSelectDialog from '../players/player-select-dialog';
import State, {useGame, useGameSettings} from '../store/state';

import './game-menu.scss';

export const GameMenu:React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [activeDialogs, setActiveDialogs] = useState({
    settings: false,
    playerSelect: false,
  });

  const useDealer = useGameSettings((state) => state.useDealer);
  const dealerId = useGame((state) => state.dealerId);
  const players = useSelector((state:State) => state.players);

  const openDialog = (name:string) => setActiveDialogs({
    ...activeDialogs,
    [name]: true,
  });
  const closeDialog = (name:string) => setActiveDialogs({
    ...activeDialogs,
    [name]: false,
  });

  const openMenu = (event:SyntheticEvent) => setAnchorEl(event.target as Element);
  const closeMenu = () => setAnchorEl(null);

  const selectDealer = () => {
    closeMenu();
    openDialog('playerSelect');
  };
  const setDealer = (player:Player) => {
    closeDialog('playerSelect');
    dispatch(SetDealer(player?.id));
  };

  const rematch = () => {
    dispatch(Rematch());

    if (useDealer) {
      const firstPlayer = Object.values(players)[0];
      dispatch(SetDealer(firstPlayer?.id));
    }
  };

  return (
    <div>
      <IconButton edge="start" onClick={openMenu}>
        <MenuIcon />
      </IconButton>

      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClick={closeMenu} onClose={closeMenu}>
        <MenuItem onClick={rematch}>Rematch</MenuItem>
        <MenuItem onClick={selectDealer}>Change Dealer</MenuItem>
        <MenuItem onClick={() => openDialog('settings')}>Settings</MenuItem>
      </Menu>

      <PlayerSelectDialog open={activeDialogs.playerSelect} selectedId={dealerId} onSelect={setDealer} />
      <Dialog open={activeDialogs.settings} onClose={() => closeDialog('settings')}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <GameSettings />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog('settings')}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
