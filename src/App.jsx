import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Mechanics from "./pages/Mechanics";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";
import Notifications from "./components/Notifications";
import MechanicDetails from "./pages/MechanicDetails";
import { MechLinkProvider } from "./context/MechLinkContext";


function App() {

    return (
        <MechLinkProvider>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mechanics" element={<Mechanics />} />
                    <Route path="/mechanics/:id" element={<MechanicDetails />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/notifications" element={<Notifications />} />
                </Routes>
            </BrowserRouter>
        </MechLinkProvider>
    );

}

export default App;