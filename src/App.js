import './App.css';
import {BrowserRouter,  Route, Routes} from 'react-router-dom'
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import GamePage from "./Pages/GamePage/GamePage";
import React from "react";
import QrAuthPage from "./Pages/QRAuthPage/QRAuthPage";
import fm from './font/montserrat/stylesheet.css'
import fg from './font/gilroy/stylesheet.css'

function App() {
    // document.addEventListener("mousewheel", this.mousewheel.bind(this), { passive: false });
    // window.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
            <Route path='/:id/:token' element={<QrAuthPage />}/>
            <Route path='/' element={<GamePage />}/>
            <Route
                path="*"
                element={
                    <NotFoundPage/>
                }
            />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
