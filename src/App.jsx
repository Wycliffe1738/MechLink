import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Mechanics from "./pages/Mechanics";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";
import Notifications from "./components/Notifications";




function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mechanics" element={<Mechanics />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notifications" element={<Notifications />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;