import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import SlipBody from "./components/settings/body";
import {Navbar} from "react-bootstrap";
import logo from "./img.png";

function App() {
    return (
        <div className={'App'}>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    부경상사 ERP
                </Navbar.Brand>
            </Navbar>
            <SlipBody/>
        </div>
    );
}

export default App;
