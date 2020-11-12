import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import PreviewDialogContainer from '../../containers/dialog/PreviewDialogContainer';
import LoadDialogContainer from '../../containers/dialog/LoadDialogContainer';
import DownLoadDialogContainer from '../../containers/dialog/DownLoadDialogContainer';
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
                case 'Css':
                  return <div />;
                case 'DownLoad':
                  return <DownLoadDialogContainer dot={dot} />;
                case 'Load':
                  return <LoadDialogContainer />;
                case 'Test':
                  return (
                    <div>
                      {[...new Array(50)]
                        .map(
                          () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        )
                        .join('\n')}
                    </div>
                  );
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
