import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const RNavbar = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand>Covid 19</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <NavLink className='nav-link' to="/covid-stat/">Dashboard</NavLink>
                <NavLink className='nav-link' to="/covid-stat/map">Map</NavLink>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default RNavbar