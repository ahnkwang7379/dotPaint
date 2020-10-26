import React from 'react';
import { keyframes } from 'styled-components';
import shortid from 'shortid';

const Animation = (props) => {
  const { boxShadow, duration } = props;
  const name = `anim-${shortid.generate()}`;
  const keyframeName = `${name}`;
  const keyframeRules = keyframes`${boxShadow}`.rules;
  const style = {
    position: 'absolute',
    animation: `x ${duration}s infinite`,
    animationName: keyframeName,
  };
  const animString = `@keyframes ${keyframeName} {${keyframeRules}}`;
  return (
    <div>
      <div className="animation-container" style={style} />
      <style>{animString}</style>
    </div>
  );
};

export default Animation;
