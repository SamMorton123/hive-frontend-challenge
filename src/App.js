import React from 'react';
import { Dropdown } from './components/Dropdown';

import './App.css';

const App = () => {

  const data = ['Sam', 'Nat', 'Tan', 'Dave', 'Person 1', 'Person 2', 'Person 3', 'Personsssjsjsjsj4', 'Andnddnd 5', 'And more', 'Select all', 'None'];

  return (
    <div className="app">
      <Dropdown data={data} multiselect={false} />
    </div>
  );
}

export default App;
