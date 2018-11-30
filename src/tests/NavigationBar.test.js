import React from 'react';
import ReactDOM from 'react-dom';
import CalendarNavigationBar from '../components/calendar/main-view/CalendarNavigationBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CalendarNavigationBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
