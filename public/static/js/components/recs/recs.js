import React from 'react';
import ReactDOM from 'react-dom';

import RecTable from './RecTable';

const data = {
  users: [
    {
      name: 'Topanga',
      photo_url: null,
    },
    {
      name: 'Beast Boy',
      photo_url: null,
    },
    {
      name: 'Toph Beifong',
      photo_url: null,
    },
    {
      name: 'Jessica Ko',
      photo_url: null
    },
  ]
};

ReactDOM.render(
  <RecTable users={data.users} />,
  document.getElementById('content')
);
