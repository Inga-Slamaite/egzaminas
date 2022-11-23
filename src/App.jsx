import "./App.css";
import MainP from "./components/patiekalai/Main";
import MainU from "./components/uzsakymas/Main";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
 
return (<BrowserRouter>
  
  <Routes>
    <Route path="/" element={<MainP/>}></Route>
    <Route path="/patiekalai" element={<MainP/>}></Route>
    <Route path="/uzsakymai" element={<MainU/>}></Route>
    

    
  </Routes>
</BrowserRouter>
  
)

}

export default App;