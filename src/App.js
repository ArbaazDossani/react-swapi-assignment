import React from 'react';
import { Route } from 'react-router-dom';

import Listing from './routes/Listing';
import CharacterDetails from './routes/CharacterDetails';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Listing} />
      <Route exact path="/details" component={CharacterDetails} />
    </main>
  </div>
)

export default App;
