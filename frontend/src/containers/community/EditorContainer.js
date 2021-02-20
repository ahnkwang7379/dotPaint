import React, { useState, useEffect, useCallback } from 'react';
import Editor from '../../components/community/Editor';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeField,
  initialize,
  loadDotArt,
  unloadDotArt,
} from '../../modules/write';
import { getDotArtDataFromStorage } from '../../util/localStorage';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, dotArt, titleError, dotArtError } = useSelector(
    ({ write }) => ({
      title: write.title,
      dotArt: write.dotArt,
      titleError: write.requiredValueEmptyError.title,
      dotArtError: write.requiredValueEmptyError.dotArt,
    }),
  );
  const { backgroundImg } = useSelector(({ observer }) => ({
    backgroundImg: observer.backgroundImg,
  }));
  const [loadedData, setLoadedData] = useState(
    getDotArtDataFromStorage(localStorage),
  );
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );
  const loadDotArtHandle = useCallback(
    (loadedData) => {
      dispatch(loadDotArt(loadedData));
    },
    [dispatch],
  );
  const unloadDotArtHandle = useCallback(() => {
    dispatch(unloadDotArt());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <Editor
      title={title}
      dotArt={dotArt}
      loadedData={loadedData}
      titleError={titleError}
      dotArtError={dotArtError}
      backgroundImg={backgroundImg}
      onChangeField={onChangeField}
      loadDotArtHandle={loadDotArtHandle}
      unloadDotArtHandle={unloadDotArtHandle}
    />
  );
};

export default EditorContainer;
