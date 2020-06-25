import React from 'react';
import styled, { css } from 'styled-components';
import { DOT, BUCKET, PICKER, ERASER } from '../../../modules/paintTool';

const PaintToolBlock = styled.div`
  display: flex;
`;

const PaintToolBox = styled.div`
  width: 50px;
  height: 50px;
  background: #0f0f0f;
  ${(props) =>
    props.selected &&
    css`
      background: skyblue;
    `}
`;

const PaintTool = ({
  onChangePaintTool,
  paintToolSet,
  selectedPaintTool,
  onTogglePaintTool,
}) => {
  return (
    <>
      <PaintToolBlock>
        <PaintToolBox onClick={() => onTogglePaintTool(BUCKET)} />
        {/* {paintToolSet.map((paintTool) =>
          paintTool === selectedPaintTool ? (
            <PaintToolBox
              selected
              key={paintTool}
              onClick={() => onChangePaintTool(paintTool)}
            />
          ) : (
            <PaintToolBox
              key={paintTool}
              onClick={() => onChangePaintTool(paintTool)}
            />
          ),
        )} */}
      </PaintToolBlock>
    </>
  );
};

export default PaintTool;
