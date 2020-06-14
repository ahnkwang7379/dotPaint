import React from 'react';
import { Route } from 'react-router-dom';
import DotPaintpage from './pages/DotPaintpage';
import NonoGrampage from './pages/NonoGrampage';

const App = () => {
  return (
    <>
      <Route component={NonoGrampage} path="/no" exact />
      <Route component={DotPaintpage} path="/dot" exact />
    </>
  );
};

export default App;
