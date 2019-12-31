import {Dialog, DialogTitle, List, ListItem, ListItemText} from '@material-ui/core';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/root-reducer';
import Player from './player';

interface PlayerSelectDialogProps {
  open:boolean;

  onSelect(selected?:Player):void;
}

const PlayerSelectDialog:React.FC<PlayerSelectDialogProps> = ({
  open,
  onSelect,
}) => {
  const players = useSelector((state:RootState) => state.players);

  return (
    <Dialog open={open} onClose={() => onSelect()}>
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
