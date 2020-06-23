import React from 'react';
import { Route } from 'react-router-dom';
import DotPaintpage from './pages/DotPaintpage';

const App = () => {
  return (
    <>
      <Route component={DotPaintpage} path="/dot" exact />
    </>
  );
};

export default App;
