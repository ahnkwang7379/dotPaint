import React from 'react';
import styled from 'styled-components';
import White from '../../img/white.png';
import Black from '../../img/black.png';
import ToolTip from '../common/ToolTip';
import { GithubPicker } from 'react-color';

const BorderWrapper = styled.div`
  border: 2px solid #59564f;
  border-radius: 3px;
  padding: 4px 6px;
  background-color: #f2e8dc;
`;

const BackgroundBlock = styled.div`
  display: flex;
  & > h4 {
    padding: 0;
    margin: 0;
    margin-right: 8px;
  }
`;

const BackgroundCell = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 3px;
  background-image: ${(props) =>
    props.backgroundImg === 1 ? `url(${White})` : `url(${Black})`};
  border: 2px solid ${(props) => (props.selected ? `orange` : `#6f6f6f`)};
`;

const BorderBlock = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  & > h4 {
    padding: 0;
    margin: 0;
    margin-right: 8px;
  }
`;

const BorderPickBox = styled.div`
  cursor: pointer;
  margin-right: 3px;
  border: 2px solid ${(props) => (props.selected ? `orange` : `#afafaf`)};
  width: 20px;
  height: 20px;
  padding: ${(props) => `${6 - props.pixel}px`};
  :before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${(props) => (props.selected ? `orange` : `#afafaf`)};
  }
`;

const ColorPicker = styled.div`
  margin-top: 8px;
  margin-left: -2px;
`;

const BorderControl = ({
  borderSize,
  borderColor,
  backgroundImg,
  onChangeDotBorderSize,
  onChangeDotBorderColor,
  onChangeBackgroundImg,
}) => {
  return (
    <BorderWrapper>
      <BackgroundBlock>
        <h4>Background</h4>
        <ToolTip toolTipWidth={40} toolTipText={<>dark</>}>
          <BackgroundCell
            backgroundImg={0}
            selected={backgroundImg === 0}
            onClick={() => onChangeBackgroundImg(0)}
          />
        </ToolTip>
        <ToolTip toolTipWidth={40} toolTipText={<>white</>}>
          <BackgroundCell
            backgroundImg={1}
            selected={backgroundImg === 1}
            onClick={() => onChangeBackgroundImg(1)}
          />
        </ToolTip>
      </BackgroundBlock>
      <BorderBlock>
        <h4>Dot Border</h4>
        <ToolTip toolTipWidth={40} toolTipText={<>none</>}>
          <BorderPickBox
            onClick={() => onChangeDotBorderSize(0)}
            pixel={-2}
            selected={borderSize === 0}
            borderColor={borderColor}
          />
        </ToolTip>
        <ToolTip toolTipWidth={40} toolTipText={<>1px</>}>
          <BorderPickBox
            onClick={() => onChangeDotBorderSize(1)}
            pixel={1}
            selected={borderSize === 1}
            borderColor={borderColor}
          />
        </ToolTip>
        <ToolTip toolTipWidth={40} toolTipText={<>2px</>}>
          <BorderPickBox
            onClick={() => onChangeDotBorderSize(2)}
            pixel={2}
            selected={borderSize === 2}
            borderColor={borderColor}
          />
        </ToolTip>
        <ToolTip toolTipWidth={40} toolTipText={<>3px</>}>
          <BorderPickBox
            onClick={() => onChangeDotBorderSize(3)}
            pixel={3}
            selected={borderSize === 3}
            borderColor={borderColor}
          />
        </ToolTip>
      </BorderBlock>
      <ColorPicker>
        <ToolTip
          direction="bottom"
          toolTipWidth={100}
          toolTipText={<>Set border color</>}
        >
          <GithubPicker
            onChange={onChangeDotBorderColor}
            width={190}
            colors={[
              '#B80000',
              '#DB3E00',
              '#FCCB00',
              '#008B02',
              '#1273DE',
              '#004DCF',
              '#5300EB',
              '#000000',
              '#9b9b9b',
              '#ffffff',
              '#f78da7',
              '#eb144c',
              '#9379d2',
              '#87ceeb',
            ]}
          />
        </ToolTip>
      </ColorPicker>
    </BorderWrapper>
  );
};

export default React.memo(BorderControl);
