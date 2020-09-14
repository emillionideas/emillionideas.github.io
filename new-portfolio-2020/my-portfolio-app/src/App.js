import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand'
import Nav from 'react-bootstrap/esm/Nav'
import './App.css'

import Footer from "./components/Footer"
import About from './pages/About'
import GraphicDesign from './pages/GraphicDesign'
import WebDevelopment from './pages/WebDevelopment'
import Illustration from './pages/Illustration'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      title: "Emily Tran",
      headerLinks: [
        {title: "home", path:"/"},
        {title: "graphic design", path:"/graphic-design"},
        {title: "web development", path:"/web-development"},
        {title: "illustration", path:"/illustration"},
        {title: "about", path:"/about"}
      ],
      home: {
        title: "Emily Tran",
        subtitle: "Learn everything. Forget everything. Then design.",
        text: "I think James Victore said this."
      },
      about: {
        title: "Emily Tran, D.C. based graphic designer, illustrator and web designer.",
        
      },
    }
  }
  render() {
    return (
      <Router>
        <Container className="p-0" fluid={true}>
          <Navbar className="border-bottom" bg="transparent" expand="lg">
            <NavbarBrand>Emily Tran</NavbarBrand>
             <Navbar.Toggle className="border-0" aria-controls="navbar-toggler" />
              <Navbar.Collapse id="navbar-toggler">
               <Nav className="ml-auto">
                 <Link className="nav-link" to="/">Web Development</Link>
                 <Link className="nav-link" to="/graphic-design" >Graphic Design</Link>
                 <Link className="nav-link" to="/illustration">Illustration</Link>
                 <Link className="nav-link" to="/about">About</Link>

               </Nav>
              </Navbar.Collapse>
             
          </Navbar>
    <Route path="/" exact render={() => <WebDevelopment title={this.state.home.title} subtitle={this.state.home.subtitle} text={this.state.home.text}/>}/>
    <Route path="/graphic-design"  render={() => <GraphicDesign />}/>
    <Route path="/illustration"  render={() => <Illustration />}/>
    <Route path="/about"  render={() => <About title={this.state.about.title}/>}/>
          <Footer />
        </Container>
      </Router>
    )
  }
}

export default App;
