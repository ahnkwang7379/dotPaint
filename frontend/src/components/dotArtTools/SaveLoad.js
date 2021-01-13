import React, { useCallback } from 'react';
import styled from 'styled-components';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from '../common/CustomButton';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SaveIcon from '@material-ui/icons/Save';
import ToolTip from '../common/ToolTip';
import { DiCss3 } from 'react-icons/di';

const ButtonBlock = styled.div`
  display: flex;
  height: 40px;
`;

const SaveLoad = ({
  storageShortcuts,
  newProjectHandle,
  dotClearHandle,
  saveHandle,
  dialogOpenHandle,
}) => {
  const onClickNewProject = useCallback(() => {
    newProjectHandle();
  }, [newProjectHandle]);

  return (
    <React.Fragment>
      <ButtonBlock>
        <ToolTip placement="top" tooltip={<>Open new project</>}>
          <CustomButton onClick={onClickNewProject}>
            <FiberNewIcon />
          </CustomButton>
        </ToolTip>
        <ToolTip placement="top" tooltip={<>Clear selected frame</>}>
          <CustomButton onClick={dotClearHandle}>Clear</CustomButton>
        </ToolTip>
      </ButtonBlock>
      <ButtonBlock>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              Save to localStorage
              <span className="tooltip-shortcut">{`(${storageShortcuts['SAVE_DOTART'].key})`}</span>
            </div>
          }
        >
          <CustomButton onClick={saveHandle}>
            <PublishIcon />
          </CustomButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={
            <div>
              Load from localStorage
              <span className="tooltip-shortcut">{`(${storageShortcuts['LOAD_DOTART'].key})`}</span>
            </div>
          }
        >
          <CustomButton onClick={() => dialogOpenHandle('Load')}>
            <GetAppIcon />
          </CustomButton>
        </ToolTip>
      </ButtonBlock>
      <ButtonBlock>
        <ToolTip
          placement="top"
          tooltip={
            <>
              Open Download dialog
              <span className="tooltip-name">
                download dotArt in diffrent formats
              </span>
            </>
          }
        >
          <CustomButton onClick={() => dialogOpenHandle('DownLoad')}>
            <SaveIcon />
          </CustomButton>
        </ToolTip>
        <ToolTip
          placement="top"
          tooltip={
            <>
              Open CSS dialog
              <span className="tooltip-name">show your CSS code</span>
            </>
          }
        >
          <CustomButton onClick={() => dialogOpenHandle('Css')}>
            <DiCss3 />
          </CustomButton>
        </ToolTip>
      </ButtonBlock>
    </React.Fragment>
  );
};

export default React.memo(SaveLoad);
