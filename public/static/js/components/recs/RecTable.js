import React, { PureComponent } from 'react';

const RecTable = (props) => {
  // Display nothing if no data provided
  if (props.users.length === 0) {
    return (
      <h3>No one has given you a recommendation.</h3>
    );
  }

  const rows = props.users.map((user, index) =>
    <tr key={index}>
      <td>{user.name}</td>
    </tr>
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <td>Some random text</td>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default RecTable;
