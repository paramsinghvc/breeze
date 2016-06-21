import React from 'react';
import { render } from 'react-dom';
import Root from './src/containers/Root';

require('./src/styles/index.scss');

render(
	<Root />,
	document.getElementById('main')
	) 
