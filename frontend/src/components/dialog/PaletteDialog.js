import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChromePicker, SliderPicker } from 'react-color';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import TextField from '@material-ui/core/TextField';
import shortid from 'shortid';
import AddIcon from '@material-ui/icons/Add';
import PaletteBlock from './PaletteBlock';

const PaletteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 8px;
  }
`;

const NameBlock = styled.div`
  width: 100%;
  max-width: 820px;
  height: 30px;
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const DraggablePaletteBlock = styled.div`
  margin-right: 8px;
  padding: 4px;
  background: #a69e94;
  width: 570px;
  height: fit-content;
`;

const AddPaletteBlock = styled.div`
  cursor: pointer;
  align-items: center;
  margin-top: 4px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: orange;
  border: 4px dotted orange;
  background-color: #f2e8dc;
`;

const ColorPickerBox = styled.div`
  width: 240px;
  height: 310px;
  padding: 4px;
  border: 4px solid #a69e94;
  & > * {
    margin-bottom: 16px;
  }
`;

const StyledButton = styled.button`
  width: 80px;
  height: 40px;
  margin-left: 10px;
  outline: none;
  background-color: #f2e8dc;
  border: 1px solid #a69e94;
  border-radius: 5px;
  &:hover {
    background-color: #59564f;
    color: white;
  }
`;

const PaletteDialog = ({
  palette,
  paletteName,
  savePaletteHandle,
  deletePaletteHandle,
  closePaletteHandle,
  changeTypingHandle,
}) => {
  const [selectColor, setSelectColor] = useState(palette[0][0]);
  const [paletteColors, setPaletteColors] = useState(palette);
  const [name, setName] = useState(paletteName);
  const [selectId, setSelectId] = useState({
    palette: palette[0].id,
    color: 0,
  });

  useEffect(() => {
    setSelectColor(
      paletteColors.find((palette) => palette.id === selectId.palette).colors[
        selectId.color
      ],
    );
  }, [selectId]);

  const onChangeName = (e) => {
    let newName = e.target.value;
    setName(newName.length > 20 ? newName.slice(0, 20) : newName);
  };

  const onChangeColor = useCallback((pick) => {
    const selectCell = document.getElementById('select-color-cell');
    selectCell.style.backgroundColor = pick.hex;
    setSelectColor(pick.hex);
  }, []);

  const onClickSelectHandle = (paletteId, colorIdx) => {
    // select정보 바꾸기 전 paletteColor에 color 정보 저장
    let newPalette = paletteColors.map((palette) =>
      palette.id !== selectId.palette
        ? palette
        : {
            id: palette.id,
            colors: [
              ...palette.colors.map((color, colorIdx) =>
                colorIdx !== selectId.color ? color : selectColor,
              ),
            ],
          },
    );
    setPaletteColors(newPalette);

    setSelectId({ palette: paletteId, color: colorIdx });
    setSelectColor(
      paletteColors.find((palette) => palette.id === paletteId).colors[
        colorIdx
      ],
    );
  };

  const onClickAddCellHandle = (paletteId) => {
    let randomColor = Math.round(Math.random() * 0xffffff).toString(16);
    randomColor =
      randomColor.length < 6 ? `#0${randomColor}` : `#${randomColor}`;

    setPaletteColors(
      paletteColors.map((palette) =>
        palette.id !== paletteId
          ? palette
          : {
              id: palette.id,
              colors: palette.colors.concat(randomColor),
            },
      ),
    );
    setSelectId({
      palette: paletteId,
      color: paletteColors.find((palette) => palette.id === paletteId).colors
        .length,
    });
  };

  const onClickRemoveCellHandle = (paletteId, cellIdx) => {
    const paletteIdx = paletteColors.findIndex(
      (palette) => palette.id === paletteId,
    );
    setPaletteColors(
      paletteColors.map((palette, idx) =>
        idx !== paletteIdx
          ? palette
          : {
              id: palette.id,
              colors: []
                .concat(palette.colors.slice(0, cellIdx))
                .concat(palette.colors.slice(cellIdx + 1)),
            },
      ),
    );
    if (selectId.palette === paletteId && selectId.color >= cellIdx) {
      if (selectId.color === cellIdx) {
        setSelectId({ palette: paletteId, color: cellIdx - 1 });
      } else {
        setSelectId({ palette: paletteId, color: selectId.color - 1 });
      }
    }
  };

  const onClickAddPaletteHandle = () => {
    let randomColor = Math.round(Math.random() * 0xffffff).toString(16);
    randomColor =
      randomColor.length < 6 ? `#0${randomColor}` : `#${randomColor}`;
    setPaletteColors(
      paletteColors.concat({
        id: shortid.generate(),
        colors: [randomColor],
      }),
    );
  };

  const onClickRemovePaletteHandle = (paletteId) => {
    if (paletteColors.length === 1) return;
    const newPaletteColors = paletteColors.filter(
      (palette) => palette.id !== paletteId,
    );
    setPaletteColors(newPaletteColors);
    if (paletteId === selectId.palette) {
      setSelectId({ palette: newPaletteColors[0].id, color: 0 });
    }
  };

  const onClickSavePalette = () => {
    // 기존 정보 저장
    let newPaletteData = paletteColors.map((palette) =>
      palette.id !== selectId.palette
        ? palette
        : {
            id: palette.id,
            colors: [
              ...palette.colors.map((color, colorIdx) =>
                colorIdx !== selectId.color ? color : selectColor,
              ),
            ],
          },
    );
    savePaletteHandle(newPaletteData, name);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    let newPaletteColors = [...paletteColors];

    if (result.type === 'palettes') {
      // palette 통으로 움직였을 때
      const startIdx = result.source.index;
      const endIdx = result.destination.index;
      const [removed] = newPaletteColors.splice(startIdx, 1);
      newPaletteColors.splice(endIdx, 0, removed);
      setPaletteColors(newPaletteColors);
    } else {
      // cell을 움직였을 때
      if (source.droppableId === destination.droppableId) {
        // 같은 palette로 이동
        const paletteIdx = newPaletteColors.reduce(
          (acc, cur, idx) => (cur.id === destination.droppableId ? idx : acc),
          [],
        );
        const [removed] = newPaletteColors[paletteIdx].colors.splice(
          source.index,
          1,
        );
        newPaletteColors[paletteIdx].colors.splice(
          destination.index,
          0,
          removed,
        );
        setPaletteColors(newPaletteColors);
      } else {
        // 다른 palette로 이동
        const [color] = newPaletteColors.reduce(
          (acc, cur) =>
            cur.id === source.droppableId
              ? cur.colors.splice(source.index, 1)
              : acc,
          [],
        );
        newPaletteColors = newPaletteColors.map((palette) =>
          palette.id === destination.droppableId
            ? palette.colors.splice(destination.index, 0, color)
            : palette,
        );
      }
      // 마무리 select위치 옮겨주기
      setSelectId({
        palette: destination.droppableId,
        color: destination.index,
      });
    }
  };

  return (
    <PaletteWrapper>
      <NameBlock>
        <TextField
          size="small"
          variant="outlined"
          label="Name"
          color="secondary"
          value={name}
          fullWidth={true}
          onChange={(e) => onChangeName(e)}
          onFocus={() => changeTypingHandle(true)}
          onBlur={() => changeTypingHandle(false)}
        />
        <StyledButton onClick={onClickSavePalette}>save</StyledButton>
        <StyledButton onClick={closePaletteHandle}>close</StyledButton>
        {deletePaletteHandle && (
          <StyledButton onClick={deletePaletteHandle}>delete</StyledButton>
        )}
      </NameBlock>
      <ContentWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="palettes" type="palettes">
            {(provided) => (
              <DraggablePaletteBlock
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {paletteColors.map((palette, paletteIdx) => (
                  <PaletteBlock
                    key={palette.id}
                    palette={palette}
                    paletteIdx={paletteIdx}
                    selectId={selectId}
                    onClickSelectHandle={onClickSelectHandle}
                    onClickAddCellHandle={onClickAddCellHandle}
                    onClickRemoveCellHandle={onClickRemoveCellHandle}
                    onClickRemovePaletteHandle={onClickRemovePaletteHandle}
                  />
                ))}
                {provided.placeholder}
                {paletteColors.length < 10 && (
                  <AddPaletteBlock onClick={onClickAddPaletteHandle}>
                    Add palette block
                    <AddIcon fontSize="large" />
                  </AddPaletteBlock>
                )}
              </DraggablePaletteBlock>
            )}
          </Droppable>
        </DragDropContext>
        <ColorPickerBox>
          <ChromePicker
            disableAlpha
            color={selectColor}
            onChange={onChangeColor}
          />
          <SliderPicker color={selectColor} onChange={onChangeColor} />
        </ColorPickerBox>
      </ContentWrapper>
    </PaletteWrapper>
  );
};

export default PaletteDialog;
