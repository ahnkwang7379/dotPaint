import React, { useCallback } from 'react';
import styled from 'styled-components';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import CustomButton from '../common/CustomButton';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { DiCss3 } from 'react-icons/di';
import SaveIcon from '@material-ui/icons/Save';
import ToolTip from '../common/ToolTip';
import { LoadDialog, CssDialog, DownloadDialog } from '../../modules/dialog';

const Wrapper = styled.div`
  display: flex;
  height: 40px;
  & > * {
    margin-right: 2px;
  }
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
    <Wrapper>
      <ToolTip placement="top" tooltip={<>Open new project</>}>
        <CustomButton width="40" onClick={onClickNewProject}>
          <FiberNewIcon />
        </CustomButton>
      </ToolTip>
      <ToolTip placement="top" tooltip={<>Clear selected frame</>}>
        <CustomButton width="40" onClick={dotClearHandle}>
          <DeleteOutlineIcon />
        </CustomButton>
      </ToolTip>
      <ToolTip
        placement="top"
        tooltip={
          <div>
            Save to localStorage
            <span className="tooltip-shortcut">{`(${storageShortcuts['SAVE_DOTART'].key})`}</span>
          </div>
        }
      >
        <CustomButton width="40" onClick={saveHandle}>
          <PublishIcon />
        </CustomButton>
      </ToolTip>
      <ToolTip
        placement="top"
        tooltip={
          <div>
            Open load dialog
            <span className="tooltip-shortcut">{`(${storageShortcuts['LOAD_DOTART'].key})`}</span>
          </div>
        }
      >
        <CustomButton width="40" onClick={() => dialogOpenHandle(LoadDialog)}>
          <GetAppIcon />
        </CustomButton>
      </ToolTip>
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
        <CustomButton
          width="40"
          onClick={() => dialogOpenHandle(DownloadDialog)}
        >
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
        <CustomButton width="40" onClick={() => dialogOpenHandle(CssDialog)}>
          <DiCss3 />
        </CustomButton>
      </ToolTip>
    </Wrapper>
  );
};

export default React.memo(SaveLoad);
