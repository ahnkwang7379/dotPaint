import React from 'react';
import styled, { css } from 'styled-components';
import { RiAddLine } from 'react-icons/ri';

const selectBorder = '#000000';
const defaultBorder = '#ffffff';

const Cell = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  width: 30px;
  height: 17.32px;
  margin-left: 3px;
  background-color: ${(props) => props.color || ''};
  border-left: solid 3px
    ${(props) => (props.selected ? selectBorder : defaultBorder)};
  border-right: solid 3px
    ${(props) => (props.selected ? selectBorder : defaultBorder)};
  transition: all 0.5s linear;
  ${(props) =>
    props.odd &&
    css`
      margin-top: -17px;
    `}

  :before,
  :after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    width: 21.21px;
    height: 21.21px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background-color: ${(props) => props.color || ''};
    left: 1.3934px;
    transition: all 0.5s linear;
  }

  :before {
    top: -10.6066px;
    border-top: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
    border-right: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
  }

  :after {
    bottom: -10.6066px;
    border-bottom: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
    border-left: solid 4.2426px
      ${(props) => (props.selected ? selectBorder : defaultBorder)};
  }

  &:hover {
    color: white;
  }
`;

const AddIcon = styled(RiAddLine)`
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  &:hover {
    color: white;
  }
`;

const PaletteCell = ({
  color,
  selectData,
  onSelectColor,
  onDeleteColor,
  onInsertColor,
  selected,
}) => {
  const onSelectClick = () => {
    if (selected !== true) onSelectColor(selectData);
  };
  const onDeleteDoubleClick = () => {
    // 만일을 위해 셀렉이 된 경우만 삭제되게
    if (selected === true) onDeleteColor(selectData);
  };
  const onInsertClick = () => {
    onInsertColor(selectData.palette);
  };
  return color === undefined ? (
    <Cell color="rgba(0,0,0,0)" onClick={onInsertClick}>
      <AddIcon />
    </Cell>
  ) : (
    <Cell
      color={color}
      selected={selected}
      onClick={onSelectClick}
      onDoubleClick={onDeleteDoubleClick}
    />
  );
};

export default React.memo(PaletteCell);
