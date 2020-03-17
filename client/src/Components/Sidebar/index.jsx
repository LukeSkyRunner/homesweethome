import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { signOut } from '../../Services/authentication';
import { Link, Redirect } from 'react-router-dom';
import './style.scss'

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
    console.log('componentMount', this.props);
    this.setState({
      user: this.props.user
    });
    console.log('nav', this.props);
  }

  handleSignOut() {
    console.log('This is sign out');
    signOut();
    this.props.updateUserInformation(null);
    Redirect('/');
  }

  render() {
    return (
      
      <div className="sidebar">
         <div>
             <h4>Logo</h4>
         </div>
        <div className="sidebar__item">
        <Link to="/">Dashboard</Link>
        </div>
        <div className="sidebar__item">
        <Link to="/profile">Profile</Link>
        </div>
        <div className="sidebar__item">
        <Link to="/post">New Post</Link>
        </div>
        <div className="sidebar__item">
        <Link to="/services">Services</Link>
        </div>
        <div className="sidebar__item">
        <Link to="/insert-bill">Insert Bill</Link>
        </div>
        <div className="sidebar__item">
        <Link to="/manage-building">Manage Building</Link>
        </div>
        <div className="sidebar__item">
        <Link to="/schedule">Schedule</Link>
        </div>
        <div className="sidebar__item">
        <Link to="/create-announcement">Create Announcement</Link>
        </div>
        
        <Form>
          <Button type="submit">Sign Out</Button>
        </Form>
      </div>
    );
  }
}
