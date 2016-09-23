
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import store from '../../shared/store/store';
import {Provider} from 'react-redux';

function render(){
  let content = document.createElement('div');
  content.setAttribute('id', 'content');
  document.body.appendChild(content);
  content = document.getElementById('content');

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App}/>
      </Router>
    </Provider>,
      content
  );
}

function main(){
  render();
}

main();
