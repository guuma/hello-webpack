import React from 'react';
import ReactDom from 'react-dom';
import Alert from './Alert.tsx'

const App = () => {
  return (
  <div style={{color: '#000'}}>
    Hello, React App!
    <Alert message="Success!"/>
  </div>
  );
};

const reactRoot = document.getElementById('react-root');
if (reactRoot) {
  ReactDom.render(<App />, reactRoot);
} else {
  console.log('No root element found');
}
