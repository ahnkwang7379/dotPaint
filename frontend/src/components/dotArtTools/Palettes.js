import React from 'react';
import Palette from './Palette';
import styled from 'styled-components';
import { CreatePalette, EditPalette } from '../../modules/dialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TiPlus, TiPen } from 'react-icons/ti';
import ToolTip from '../common/ToolTip';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../common/CustomButton';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
    width: 300,
  },
}));

const PalettesWrapper = styled.div`
  border: 2px solid #59564f;
  border-radius: 3px;
  padding: 2px;
`;

const SelectBlock = styled.div`
  display: flex;
`;

const PaletteBlock = styled.div`
  margin: 16px 4px;
`;

const Palettes = ({
  palettes,
  paletteNames,
  selectPaletteId,
  selectPaletteLine,
  handleChange,
  handleSelectLeftColor,
  handleSelectRightColor,
  handleSelectColorCell,
  handleOpenPaletteDialog,
}) => {
  const classes = useStyles();
  return (
    <PalettesWrapper>
      <SelectBlock>
        <Select
          className={classes.formControl}
          variant="outlined"
          color="secondary"
          value={selectPaletteId}
          onChange={handleChange}
        >
          {paletteNames.map((name) => (
            <MenuItem key={name.id} value={name.id}>
              {name.name}
            </MenuItem>
          ))}
        </Select>

        <div>
          <ToolTip placement="right" tooltip="Create new palette">
            <CustomButton
              height="25"
              width="30"
              onClick={() => handleOpenPaletteDialog(CreatePalette)}
            >
              <TiPlus />
            </CustomButton>
          </ToolTip>
          <ToolTip placement="right" tooltip="Edit this palette">
            <CustomButton
              height="25"
              width="30"
              onClick={() => handleOpenPaletteDialog(EditPalette)}
            >
              <TiPen />
            </CustomButton>
          </ToolTip>
        </div>
      </SelectBlock>
      <PaletteBlock>
        {palettes.map((palette, idx) => (
          <Palette
            palette={palette}
            key={palette.id}
            idx={idx}
            selectedPalette={selectPaletteLine === idx}
            handleSelectColorCell={handleSelectColorCell}
            handleSelectLeftColor={handleSelectLeftColor}
            handleSelectRightColor={handleSelectRightColor}
          />
        ))}
      </PaletteBlock>
    </PalettesWrapper>
  );
};

export default React.memo(Palettes);
