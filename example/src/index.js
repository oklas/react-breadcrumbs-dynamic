import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BreadcrumbsProvider } from '../..';

const app = (
  <BreadcrumbsProvider>
    <App/ >
  </BreadcrumbsProvider>
)

ReactDOM.render(app, document.getElementById('root'));
