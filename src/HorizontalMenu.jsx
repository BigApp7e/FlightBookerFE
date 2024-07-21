import React, { Component } from 'react';
import { FaHome, FaUser, FaBriefcase, FaEnvelope } from 'react-icons/fa';
import { ImAirplane } from "react-icons/im";

class HorizontalMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],  // Initial state as an empty array
        };
    }

    render() {
  
        return (
            <nav className="horizontal-menu" >
            <ul className="menu-list">
                <li className="menu-item">
                    <button className="menu-button">
                    <ImAirplane className="menu-icon"  />
                           Flight
                    </button>
                </li>
                <li className="menu-item">
                    <button className="menu-button">
                        <FaUser className="menu-icon" />
                        About
                    </button>
                </li>
                <li className="menu-item">
                    <button className="menu-button">
                        <FaBriefcase className="menu-icon" />
                        Services
                    </button>
                </li>
                <li className="menu-item">
                    <button className="menu-button">
                        <FaEnvelope className="menu-icon" />
                        Contact
                    </button>
                </li>
            </ul>
        </nav>
        );
    }
}

export default HorizontalMenu;
