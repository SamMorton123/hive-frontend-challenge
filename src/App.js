import React from 'react';
import { Dropdown } from './components/Dropdown';

import './App.css';

const App = () => {

  const data = ['sam', 'nat', 'tan', 'dave'];

  return (
    <div>
      <Dropdown data={data} multiselect />
    </div>
  );
}

export default App;
