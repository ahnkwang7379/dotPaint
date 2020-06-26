import React from 'react';
import styled from 'styled-components';
import { DOT, BUCKET, PICKER, ERASER } from '../../../modules/paintTool';
import PaintToolButton from '../../common/PaintToolButton';
import { TiPencil, TiPipette } from 'react-icons/ti';
import { BsFillBucketFill } from 'react-icons/bs';
import { FaEraser } from 'react-icons/fa';

const PaintToolBlock = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const PaintTool = ({ onChangePaintTool, selectedPaintTool }) => {
  return (
    <PaintToolBlock>
      <PaintToolButton
        paintTool={DOT}
        selected={selectedPaintTool === DOT}
        onClick={() => onChangePaintTool(DOT)}
      >
        <TiPencil />
      </PaintToolButton>
      <PaintToolButton
        paintTool={BUCKET}
        selected={selectedPaintTool === BUCKET}
        onClick={() => onChangePaintTool(BUCKET)}
      >
        <BsFillBucketFill />
      </PaintToolButton>
      <PaintToolButton
        paintTool={PICKER}
        selected={selectedPaintTool === PICKER}
        onClick={() => onChangePaintTool(PICKER)}
      >
        <TiPipette />
      </PaintToolButton>
      <PaintToolButton
        paintTool={ERASER}
        selected={selectedPaintTool === ERASER}
        onClick={() => onChangePaintTool(ERASER)}
      >
        <FaEraser />
      </PaintToolButton>
    </PaintToolBlock>
  );
};

export default PaintTool;
