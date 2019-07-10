import React, {useState, useEffect} from 'react';
import './app.scss';

const API = 'http://taskmasterbackend-env.f5c2b95jsn.us-west-2.elasticbeanstalk.com/tasks';
// const API = 'http://localhost:5000/tasks'
const s3Endpoint = 'https://s3.us-west-2.amazonaws.com/';
const imageBucket = 'pettynan-taskmaster-images';


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
            <form action={API + '/' + task.id + '/images'} method="POST" encType="multipart/form-data">
              <label>
                <span>Upload Image: </span>
                <input name="file" type="file" />
              </label>
              <button>+</button>
            </form>
            <img src={s3Endpoint + imageBucket + task.image} height="200px"></img>
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
