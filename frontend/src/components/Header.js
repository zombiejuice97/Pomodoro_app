import React from "react";
import { Link, Route, Routes, NavLink } from "react-router-dom";

import Home from "../pages/Home";
import StatsPage from "../pages/StatsPage"
import App from "../App";




function Header() {


  return (
    <>
      <div>
        <ul class="nav nav-tabs text-bg-success p-3">
          <li class="nav-item">
            {/* <a class="nav-link active text-bg-success p-3" aria-current="page" href="#">Tasks</a> */}
            <NavLink className="nav-link active text-bg-success p-3" to="/"> Home </NavLink>
          </li>
          <li class="nav-item">
            {/* <a class="nav-link text-bg-success p-3" href="./StatsPage">Stats</a> */}
            <NavLink className="nav-link text-bg-success p-3" to="/stats">Stats</NavLink>
          </li>
          <li class="nav-item">
            <a class="nav-link text-bg-success p-3" href="#">Link</a>
          </li>

        </ul>

      </div>
      
    </>
  )
};

export default Header;

