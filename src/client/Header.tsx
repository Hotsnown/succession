import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => {
    return (<Navbar bg="light">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="/inheritance.jpg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Simulateur de Droit des Successions
                </Navbar.Brand>
            </Navbar>)
}

export default Header