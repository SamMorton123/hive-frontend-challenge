import React from 'react';
import { Dropdown } from './components/Dropdown';

import './App.css';

const App = () => {

  const personData = [
    'Owen Mass', 'Patrick Matejka', 'Tim Ritz', "Brian Cormier", 'Will Thompson', "Andrew O'Brien",
    'Christian Wang', 'Jason Myers', 'James Balthis', 'Brendan Lawrence'
  ];
  const numberData = [];
  for (let i = 0; i < 20; i++) numberData.push(i);

  const onDataChange = (val) => console.log('State is now:', val);

  return (
    <div className="app">
      <div className="container">
        <Dropdown givenData={personData} onDataChange={onDataChange} multiselect size="large" />
        <Dropdown givenData={numberData} onDataChange={onDataChange} multiselect={false} size="large" />
      </div>

      <div className="container">
        <Dropdown givenData={personData} onDataChange={onDataChange} multiselect size="medium" />
        <Dropdown givenData={numberData} onDataChange={onDataChange} multiselect={false} size="medium" />
      </div>

      <div className="container">
        <Dropdown givenData={personData} onDataChange={onDataChange} multiselect size="small" />
        <Dropdown givenData={numberData} onDataChange={onDataChange} multiselect={false} size="small" />
      </div>
    </div>
  );
}

export default App;
