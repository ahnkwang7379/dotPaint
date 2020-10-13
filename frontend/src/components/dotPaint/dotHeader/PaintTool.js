import React from 'react';
import styled from 'styled-components';
import { DOT, BUCKET, PICKER, ERASER } from '../../../modules/paintTool';
import CustomButton from '../../common/CustomButton';
import { TiPencil, TiPipette } from 'react-icons/ti';
import { BsFillBucketFill } from 'react-icons/bs';
import { FaEraser } from 'react-icons/fa';

const PaintToolBlock = styled.div`
  display: flex;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 240px;
  height: 40px;
`;
const PaintTool = ({ onChangePaintTool, selectedPaintTool }) => {
  return (
    <PaintToolBlock>
      <CustomButton
        paintTool={DOT}
        selected={selectedPaintTool === DOT}
        onClick={() => onChangePaintTool(DOT)}
      >
        <TiPencil />
      </CustomButton>
      <CustomButton
        paintTool={BUCKET}
        selected={selectedPaintTool === BUCKET}
        onClick={() => onChangePaintTool(BUCKET)}
      >
        <BsFillBucketFill />
      </CustomButton>
      <CustomButton
        paintTool={PICKER}
        selected={selectedPaintTool === PICKER}
        onClick={() => onChangePaintTool(PICKER)}
      >
        <TiPipette />
      </CustomButton>
      <CustomButton
        paintTool={ERASER}
        selected={selectedPaintTool === ERASER}
        onClick={() => onChangePaintTool(ERASER)}
      >
        <FaEraser />
      </CustomButton>
    </PaintToolBlock>
  );
};

export default PaintTool;
