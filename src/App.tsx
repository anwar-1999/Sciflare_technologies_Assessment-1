import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router';
import Login from "./Login";
import ListingScreen from "./ListingScreen";


export default function App() {

  const app = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login/>}
          />
           <Route
            path="/listing"
            element={<ListingScreen/>}
          />
        </Routes>
      </BrowserRouter>
    )
  }
  return (
    <div className="App">
        {app()}      
    </div>
  );
}


