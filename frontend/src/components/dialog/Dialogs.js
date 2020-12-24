import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import PreviewDialogContainer from '../../containers/dialog/PreviewDialogContainer';
import LoadDialogContainer from '../../containers/dialog/LoadDialogContainer';
import DownLoadDialogContainer from '../../containers/dialog/DownLoadDialogContainer';
import KeyBindDialogConainter from '../../containers/dialog/KeyBindDialogContainer';
import { useSelector } from 'react-redux';
import MuiDialog from '@material-ui/core/Dialog';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    marginRight: theme.spacing(1),
  },
}));

// Dialog 스타일 덮어쓰기 높이 최대로, 안에 Preview 스크롤 생길 수 있게
const Dialog = withStyles((theme) => ({
  paperScrollPaper: {
    height: `calc(100% - 64px)`,
  },
}))(MuiDialog);

const DialogContent = withStyles((theme) => ({
  root: {
    overflow: 'hidden',
    height: '100%',
  },
}))(MuiDialogContent);

const Dialogs = ({ dialogType, open, handleCloseDialog }) => {
  const classes = useStyles();
  const { dot } = useSelector(({ dotArt }) => ({ dot: dotArt.present.dot }));

  const handleClose = () => {
    handleCloseDialog();
  };

  return (
    <React.Fragment>
      <Dialog open={open} fullWidth={true} maxWidth="xl" onClose={handleClose}>
        <DialogTitle>
          <IconButton
            color="inherit"
            onClick={handleClose}
            size="small"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          {dialogType}
        </DialogTitle>
        <DialogContent dividers={true}>
          {open &&
            (() => {
              switch (dialogType) {
                case 'Preview':
                  return <PreviewDialogContainer dot={dot} />;
                case 'DownLoad':
                  return (
                    <DownLoadDialogContainer
                      dot={dot}
                      dialogType={dialogType}
                    />
                  );
                case 'Load':
                  return <LoadDialogContainer />;
                case 'Css':
                  return (
                    <DownLoadDialogContainer
                      dot={dot}
                      dialogType={dialogType}
                    />
                  );
                case 'Palettes':
                  return <div>a</div>;
                case 'KeyBind':
                  return <KeyBindDialogConainter />;
                default:
                  return null;
              }
            })()}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Dialogs;