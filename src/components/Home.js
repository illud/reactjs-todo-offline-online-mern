import React, { Component } from 'react';
import Todo from './Main';
import Tododb from './Tododb';


import { Nav, Navbar, NavDropdown,  CardGroup, FormControl, Badge, CardColumns, Card, Form, Button, Container } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Link, Switch, HashRouter } from "react-router-dom";


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemsOffline : 0
    }
  }
  render(){
      return (
        <HashRouter>
          <Nav style={{ backgroundColor: '#282c34' }}>
                      <Nav.Item>
                          <h3 style={{ color: '#ffffff', marginLeft: 20 }}>React Todo</h3>
                      </Nav.Item>
                      <Nav.Item > 
                        
                        <h3 style={{ color: '#ffffff', marginLeft: 20 }}><Link to="/todo" style={{textDecoration:'inherit', color: '#2980b9'}}>Todo offline <Badge variant="light" style={{color: '#2980b9', borderRadius: 80}}>{this.state.itemsOffline}</Badge></Link></h3>
                        </Nav.Item>
                <Nav.Item >
                  <h3 style={{ color: '#ffffff', marginLeft: 20 }}><Link to="/tododb" style={{textDecoration:'inherit', color: '#27ae60'}}>Todo online <Badge variant="light" style={{color: '#27ae60', borderRadius: 80}}>{this.state.itemsOffline}</Badge></Link></h3>
                  </Nav.Item>
                  </Nav>
          <Switch>
            
            <Route path="/#/" exact component={Home} />
            <Route path="/todo" component={Todo} />
            <Route path="/tododb" component={Tododb} />
          </Switch>
  
  
      </HashRouter>
      )
  }
}


export default Home;