import React from 'react';
import Preview from '../../components/dotPaint/Preview';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const CustomDiv = styled.div`
  position: relative;
  display: grid;
  width: 16px;
  left: 40px;
  margin: 0px;
  padding: 0px;
  & > * + * {
    margin-top: 16px;
  }
`; 

const CardDiv = styled.div`
  overflow: hidden;
  background: rgb(255, 255, 255);
  opacity: 0.6;
  border: solid 1px rgba(0, 0, 0, 0);
  box-sizing: border-box;
  cursor: pointer;
  ${props => props.active ? `
    opacity: 1;
    border: solid 1px #ff7961;
  ` : ''}
`;

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    cursor: 'pointer',
  },
  iconBtn: {
    width: '1.5rem', 
    height: '1.5rem',
    fontSize: '1rem',
    padding: '0px',
    margin: '0px',
    color: theme.palette.primary.dark,
  },
  delete: {
    width: '1.5rem', 
    height: '1.5rem',
    fontSize: '1rem',
    padding: '0px',
    margin: '0px',
    color: theme.palette.primary.dark,
    cursor: 'not-allowed',
    type: 'text',
  },
  copy: {
    width: '1.5rem', 
    height: '1.5rem',
    fontSize: '1rem',
    padding: '0px',
    margin: '0px',
    color: theme.palette.primary.dark,
    cursor: 'copy',
  },
}));

const PreViewBlock = ({ active, idx, dot, columnCount, handleChangeIdx, handleCopyDotArt, handleRemoveDotArt}) => {
    const classes = useStyles();

    return (
        active === true ? (
            <CardDiv active={true}>
                <Preview dotSet={dot} column={columnCount} size={2.5} />
                <CustomDiv>
                    <IconButton onClick={() => handleRemoveDotArt(idx)} className={classes.delete} aria-label="delete">
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                    <IconButton onClick={() => handleCopyDotArt(idx)} className={classes.copy} aria-label="copy">
                        <FileCopyRoundedIcon fontSize="inherit" />
                    </IconButton>
                </CustomDiv>
            </CardDiv>
        ) : (
            <CardDiv active={false} onClick={() => handleChangeIdx(idx)}>
                <Preview dotSet={dot} column={columnCount} size={2.5} />
                <CustomDiv>
                    <IconButton className={classes.delete} aria-label="delete" disabled>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                    <IconButton className={classes.copy} aria-label="copy" disabled>
                        <FileCopyRoundedIcon fontSize="inherit" />
                    </IconButton>
                </CustomDiv>
            </CardDiv>
        )
    )
}

export default React.memo(PreViewBlock);