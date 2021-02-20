import React, { useState } from "react";
import Search from "./components/Search";

function App() {
  
  const [state, setState] = useState({filtered: [],show:false,userInput: ''})
  
  return (
    <div className="App">      
      <Search state={state} setState={setState}  />
    </div>
  );
}

export default App;
