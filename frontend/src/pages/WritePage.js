import React from 'react';
import Responsive from '../components/common/Responsive';
import TagBoxContainer from '../containers/community/TagBoxContainer';
import EditorContainer from '../containers/community/EditorContainer';
import WriteActionButtonsContainer from '../containers/community/WriteActionButtonsContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
