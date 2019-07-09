import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './app.scss';

import mockData from './mock.json';

const API = 'http://localhost:5000/tasks';


function Tasks() {

  const [tasks, setTasks] = useState([]);
  // const []


  const _getTasks = () => {


    fetch( API, {
      mode: 'cors'
    })
    .then(data => data.json())
    .then(tasks => setTasks(tasks))
    .catch(console.error);

  }

  const _advanceStatus = (e) => {
    e.preventDefault();
    let id = e.target.id;

    fetch( `${API}/${id}/state`, {
      mode: 'cors',
      method: 'PUT'
    })
    .then(data => data.json())
    .then(task => {
        setTasks( tasks.map(entry => {
          return entry.id === id ? task : entry;
        }))
      })
    .catch(console.error);
  }

  useEffect(_getTasks, []);

  return(
    <ul>
      {tasks.map( task => 
        <li key={task.id}>
          <summary>
            <div>Assigned to: {task.assignee}</div>
            <div>Title: {task.title}</div>
            <div>Description: {task.description}</div>
            <div>
              Status: {task.status} <button id={task.id} onClick={_advanceStatus}>Advance Task</button>
            </div>
          </summary>
        </li>
        )}
    </ul>
  )
}


function App() {
  return (
    <>
      <header>TaskMaster</header>
      <main>
        <Tasks />
      </main>
      <footer>&copy; 2019 Petr</footer>
    </>
  );
}

export default App;
