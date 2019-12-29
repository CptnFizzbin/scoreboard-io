import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, {useEffect, useState} from 'react';

import './delete-button.scss';

interface DeleteButtonProps {
  onDelete():void;
}

const DeleteButton:React.FC<DeleteButtonProps> = ({onDelete}) => {
  const [confirm, setConfirm] = useState(false);
  const [timeoutRef, setTimeoutRef] = useState();

  const onClick = () => {
    setConfirm(true);
    setTimeoutRef(setTimeout(() => {
      setTimeoutRef(null);
      setConfirm(false);
    }, 2000));
  };

  const onConfirmClick = () => {
    onDelete();
  };

  useEffect(() => () => {
    if (timeoutRef) {
      clearTimeout(timeoutRef);
      setTimeoutRef(null);
    }
  }, [timeoutRef]);

  return (
    <div className={'delete-button'}>
      {!confirm
        ? (
          <IconButton onClick={onClick}>
            <DeleteIcon />
          </IconButton>
        )
        : (
          <div>
            <IconButton className={'confirm-button'} onClick={onConfirmClick}>
              <DeleteForeverIcon />
            </IconButton>
          </div>
        )
      }
    </div>
  );
};

export default DeleteButton;
