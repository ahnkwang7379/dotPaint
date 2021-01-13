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

const PaintTool = ({
  paintToolsShortcuts,
  onChangePaintTool,
  selectedPaintTool,
}) => {
  return (
    <PaintToolBlock>
      <PaintButtonBlock>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              Pan Tool
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[DOT].key})`}</span>
            </div>
          }
        >
          <CustomButton
            selected={selectedPaintTool === DOT}
            onClick={() => onChangePaintTool(DOT)}
          >
            <TiPencil />
          </CustomButton>
        </ToolTip>

        <ToolTip
          placement="top"
          tooltip={
            <div>
              Bucket Tool
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[BUCKET].key})`}</span>
            </div>
          }
        >
          <CustomButton
            selected={selectedPaintTool === BUCKET}
            onClick={() => onChangePaintTool(BUCKET)}
          >
            <BsFillBucketFill />
          </CustomButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              Colorpicker Tool
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[PICKER].key})`}</span>
            </div>
          }
        >
          <CustomButton
            selected={selectedPaintTool === PICKER}
            onClick={() => onChangePaintTool(PICKER)}
          >
            <TiPipette />
          </CustomButton>
        </ToolTip>
      </PaintButtonBlock>
      <PaintButtonBlock>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              Eraser Tool
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[ERASER].key})`}</span>
            </div>
          }
        >
          <CustomButton
            selected={selectedPaintTool === ERASER}
            onClick={() => onChangePaintTool(ERASER)}
          >
            <FaEraser />
          </CustomButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              Move Tool
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[MOVE].key})`}</span>
              <div className="tooltip-name">
                <span className="tooltip-key">ALT</span>Wrap mod
              </div>
            </div>
          }
        >
          <CustomButton
            selected={selectedPaintTool === MOVE}
            onClick={() => onChangePaintTool(MOVE)}
          >
            <FaHandPaper />
          </CustomButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              Bucket all same color pixel
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[SAMECOLOR].key})`}</span>
            </div>
          }
        >
          <CustomButton
            selected={selectedPaintTool === SAMECOLOR}
            onClick={() => onChangePaintTool(SAMECOLOR)}
          >
            <FaBorderAll />
          </CustomButton>
        </ToolTip>
      </PaintButtonBlock>
    </PaintToolBlock>
  );
};

export default React.memo(PaintTool);
