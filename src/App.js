import React from 'react';
import { Dropdown } from './components/Dropdown';

import './App.css';

const App = () => {

  const data = ['Sam', 'Nat', 'Tan', 'Dave'];

  return (
    <div className="app">
      <Dropdown data={data} selectName="Select Option" multiselect={true} />
    </div>
  );
}

export default App;
