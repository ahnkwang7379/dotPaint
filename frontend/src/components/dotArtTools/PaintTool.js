import React from 'react';
import styled from 'styled-components';
import { DOT, BUCKET, PICKER, ERASER, MOVE } from '../../modules/paintTool';
import CustomButton from '../common/CustomButton';
import { TiPencil, TiPipette } from 'react-icons/ti';
import { BsFillBucketFill } from 'react-icons/bs';
import { FaEraser, FaHandPaper } from 'react-icons/fa';

const PaintToolBlock = styled.div`
  display: flex;
  height: 32px;
`;
const PaintTool = ({ onChangePaintTool, selectedPaintTool }) => {
  return (
    <PaintToolBlock>
      <CustomButton
        selected={selectedPaintTool === DOT}
        onClick={() => onChangePaintTool(DOT)}
      >
        <TiPencil />
      </CustomButton>
      <CustomButton
        selected={selectedPaintTool === BUCKET}
        onClick={() => onChangePaintTool(BUCKET)}
      >
        <BsFillBucketFill />
      </CustomButton>
      <CustomButton
        selected={selectedPaintTool === PICKER}
        onClick={() => onChangePaintTool(PICKER)}
      >
        <TiPipette />
      </CustomButton>
      <CustomButton
        selected={selectedPaintTool === ERASER}
        onClick={() => onChangePaintTool(ERASER)}
      >
        <FaEraser />
      </CustomButton>
      <CustomButton
        selected={selectedPaintTool === MOVE}
        onClick={() => onChangePaintTool(MOVE)}
      >
        <FaHandPaper />
      </CustomButton>
    </PaintToolBlock>
  );
};

export default React.memo(PaintTool);
