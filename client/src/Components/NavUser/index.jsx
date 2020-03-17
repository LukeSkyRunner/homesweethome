import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { signOut } from '../../Services/authentication';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      user: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    //console.log('NavUser', this.props);
    this.setState({
      user: this.props.user
    });
  }

  handleSignOut() {
    signOut();
    this.props.updateUserInformation(null);
  }

  render() {
    return (
      <div>
        {(this.state.user && (
          <Navbar bg="transparent" expand="lg">
            <Navbar.Brand href="/">{this.props.history.location.pathname}</Navbar.Brand>
            <Nav className="ml-auto">
              <img src={this.state.user.picture} style={{ width: '40px' }} alt="..." />
              <Nav.Link href="/profile">{this.state.user.name}</Nav.Link>
            </Nav>
          </Navbar>
        )) ||
          ''}
      </div>
    );
  }
}