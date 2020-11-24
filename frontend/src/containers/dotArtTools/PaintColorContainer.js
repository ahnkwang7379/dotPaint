import React from 'react';
import PaintColor from '../../components/dotArtTools/PaintColor';
import { useSelector } from 'react-redux';

const PaintColorContainer = () => {
  const { leftColor, rightColor } = useSelector(({ palettes }) => ({
    // leftColor: palettes.palettes.reduce(
    //   (acc, palette) =>
    //     palette.id === palettes.selectColorId.paletteId
    //       ? palette.colors[palettes.selectColorId.colorId]
    //       : acc,
    //   [],
    // ),
    // rightColor: palettes.palettes.reduce(
    //   (acc, palette) =>
    //     palette.id === palettes.selectColorId.paletteId
    //       ? palette.colors[palettes.selectColorId.colorId]
    //       : acc,
    //   [],
    // ),
    leftColor: palettes.leftColor,
    rightColor: palettes.rightColor,
  }));

  return <PaintColor leftColor={leftColor} rightColor={rightColor} />;
};

export default PaintColorContainer;
