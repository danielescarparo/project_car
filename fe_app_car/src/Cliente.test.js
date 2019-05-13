import React from 'react';
import ReactDOM from 'react-dom';
import App from './Cliente';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cliente />, div);
});
