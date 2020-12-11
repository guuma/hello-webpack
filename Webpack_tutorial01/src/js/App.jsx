import React from 'react';
import ReactDom from 'react-dom';

const App = () => {
  return <div>Hello, React App!</div>;
};

const reactRoot = document.getElementById('react-root');
if (reactRoot) {
  ReactDom.render(<App />, reactRoot);
} else {
  console.log('No root element found');
}
