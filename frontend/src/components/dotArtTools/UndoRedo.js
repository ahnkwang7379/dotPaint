import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing(1),
  },
}));

const UndoRedo = ({ undoHandle, redoHandle }) => {
  const classes = useStyles();
  return (
    <div>
      <IconButton className={classes.icon} onClick={() => undoHandle()}>
        <UndoIcon />
      </IconButton>
      <IconButton className={classes.icon} onClick={() => redoHandle()}>
        <RedoIcon />
      </IconButton>
    </div>
  );
};

export default UndoRedo;
