import React, { Component } from 'react';
import axios from 'axios';

import RecTable from './RecTable';

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('https://randomuser.me/api/?results=20')
      .then(res => this.setState({ users: res.data.results }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <RecTable users={this.state.users} />
    );
  }
}

export default Recommendations;
