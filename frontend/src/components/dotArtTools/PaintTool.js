import React from 'react';
import styled from 'styled-components';
import {
  DOT,
  BUCKET,
  PICKER,
  ERASER,
  MOVE,
  SAMECOLOR,
  DITHERING,
} from '../../modules/paintTool';
import CustomButton from '../common/CustomButton';
import { TiPencil, TiPipette } from 'react-icons/ti';
import { BsFillBucketFill } from 'react-icons/bs';
import { CgColorBucket } from 'react-icons/cg';
import { FaEraser, FaHandPaper, FaBorderAll } from 'react-icons/fa';
import ToolTip from '../common/ToolTip';

const PaintToolWrapper = styled.div`
  width: 100%;
  padding: 4px;
`;

const PaintButtonBlock = styled.div`
  height: 40px;
  display: flex;
  margin-bottom: 8px;

  & > * {
    margin-right: 1px;
  }
`;

const PaintTool = ({
  paintToolsShortcuts,
  onChangePaintTool,
  selectedPaintTool,
}) => {
  return (
    <PaintToolWrapper>
      <span>Paint Tools</span>
      <PaintButtonBlock>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              {paintToolsShortcuts[DOT].helpText}
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[DOT].key})`}</span>
            </div>
          }
        >
          <CustomButton
            width="40"
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
              {paintToolsShortcuts[BUCKET].helpText}
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[BUCKET].key})`}</span>
            </div>
          }
        >
          <CustomButton
            width="40"
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
              {paintToolsShortcuts[SAMECOLOR].helpText}
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[SAMECOLOR].key})`}</span>
            </div>
          }
        >
          <CustomButton
            width="40"
            selected={selectedPaintTool === SAMECOLOR}
            onClick={() => onChangePaintTool(SAMECOLOR)}
          >
            <CgColorBucket />
          </CustomButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              {paintToolsShortcuts[ERASER].helpText}
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[ERASER].key})`}</span>
            </div>
          }
        >
          <CustomButton
            width="40"
            selected={selectedPaintTool === ERASER}
            onClick={() => onChangePaintTool(ERASER)}
          >
            <FaEraser />
          </CustomButton>
        </ToolTip>
      </PaintButtonBlock>
      <PaintButtonBlock>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              {paintToolsShortcuts[PICKER].helpText}
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[PICKER].key})`}</span>
            </div>
          }
        >
          <CustomButton
            width="40"
            selected={selectedPaintTool === PICKER}
            onClick={() => onChangePaintTool(PICKER)}
          >
            <TiPipette />
          </CustomButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              {paintToolsShortcuts[MOVE].helpText}
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[MOVE].key})`}</span>
              <div className="tooltip-name">
                <span className="tooltip-key">ALT</span>Wrap mod
              </div>
            </div>
          }
        >
          <CustomButton
            width="40"
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
              {paintToolsShortcuts[DITHERING].helpText}
              <span className="tooltip-shortcut">{`(${paintToolsShortcuts[DITHERING].key})`}</span>
            </div>
          }
        >
          <CustomButton
            width="40"
            selected={selectedPaintTool === DITHERING}
            onClick={() => onChangePaintTool(DITHERING)}
          >
            <FaBorderAll />
          </CustomButton>
        </ToolTip>
      </PaintButtonBlock>
    </PaintToolWrapper>
  );
};

export default React.memo(PaintTool);
