import {Dialog, DialogTitle, List, ListItem, ListItemText} from '@material-ui/core';
import React from 'react';
import {PlayersState, usePlayers} from '../store/state';
import Player from './player';

interface PlayerSelectDialogProps {
  open:boolean;
  selectedId:number;

  onSelect(selected?:Player):void;
}

const PlayerSelectDialog:React.FC<PlayerSelectDialogProps> = ({
  open,
  selectedId,
  onSelect,
}) => {
  const players = usePlayers<PlayersState>();
  const selectedPlayer = usePlayers<Player | undefined>((state) => state[selectedId]);

  return (
    <Dialog open={open} onClose={() => onSelect(selectedPlayer)}>
      <DialogTitle>Choose Player</DialogTitle>
      <List>
        {Object.values(players).map((player) => (
          <ListItem button onClick={() => onSelect(player)} key={player.id}>
            <ListItemText>
              {player.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default PlayerSelectDialog;
