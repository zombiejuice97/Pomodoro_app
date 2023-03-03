import React from "react";
import Header from "./components/Header";

import Home from "./pages/Home";
import { Route,Routes} from "react-router-dom";
import StatsPage from "./pages/StatsPage";

function App() {
    
    return (
       <>
       <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<StatsPage />} />

        </Routes>
       </>
    );
}

export default App;