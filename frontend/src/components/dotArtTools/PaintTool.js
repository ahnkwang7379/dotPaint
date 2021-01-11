import React from 'react';
import styled from 'styled-components';
import {
  DOT,
  BUCKET,
  PICKER,
  ERASER,
  MOVE,
  SAMECOLOR,
} from '../../modules/paintTool';
import CustomButton from '../common/CustomButton';
import { TiPencil, TiPipette } from 'react-icons/ti';
import { BsFillBucketFill } from 'react-icons/bs';
import { FaEraser, FaHandPaper, FaBorderAll } from 'react-icons/fa';
import ToolTip from '../common/ToolTip';

const PaintToolBlock = styled.div`
  /* display: flex; */
  /* height: 64px; */
`;

const PaintButtonBlock = styled.div`
  display: flex;
  height: 32px;
`;

const PaintTool = ({ paintTools, onChangePaintTool, selectedPaintTool }) => {
  return (
    <PaintToolBlock>
      <PaintButtonBlock>
        <ToolTip
          direction="bottom"
          // toolTipWidth="60"
          toolTipText={<></>}
        >
          <CustomButton
            selected={selectedPaintTool === DOT}
            onClick={() => onChangePaintTool(DOT)}
          >
            <TiPencil />
          </CustomButton>
        </ToolTip>

        <ToolTip direction="right" toolTipText={<></>}>
          <CustomButton
            selected={selectedPaintTool === BUCKET}
            onClick={() => onChangePaintTool(BUCKET)}
          >
            <BsFillBucketFill />
          </CustomButton>
        </ToolTip>
        <ToolTip direction="left" toolTipWidth="80" toolTipText={<></>}>
          <CustomButton
            selected={selectedPaintTool === PICKER}
            onClick={() => onChangePaintTool(PICKER)}
          >
            <TiPipette />
          </CustomButton>
        </ToolTip>
      </PaintButtonBlock>
      <PaintButtonBlock>
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
        <CustomButton
          selected={selectedPaintTool === SAMECOLOR}
          onClick={() => onChangePaintTool(SAMECOLOR)}
        >
          <FaBorderAll />
        </CustomButton>
      </PaintButtonBlock>
    </PaintToolBlock>
  );
};

export default React.memo(PaintTool);
