import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Component/filefolder/Home';


interface ListItem {
  text: string;
  children?: ListItem[];
}
function App() {
  
  return (
    <div className="App">
     
      <Home/>
    
    </div>
  );
}

export default App;
