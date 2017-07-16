import React from 'react';
import PropTypes from 'prop-types';

const RecTable = (props) => {
  // Display nothing if no data provided
  if (!props.users || props.users.length === 0) {
    return (
      <h4>No one has given you a recommendation.</h4>
    );
  }

  const rows = props.users.map((user, index) =>
    <tr key={index}>
      <td><img src={user.picture.thumbnail} /> {user.name.first} {user.name.last}</td>
      <td style={{ verticalAlign: 'middle' }}>{user.email}</td>
    </tr>
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Email</td>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

RecTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

export default RecTable;
