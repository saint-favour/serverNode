import React,{useEffect, useState} from "react";
import './App.css';
import { TiDelete } from "react-icons/ti";
import { MdLibraryAddCheck } from "react-icons/md";
import { CiBookmarkCheck } from "react-icons/ci";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("") 
  const [allTodos, setTodos] = useState([])
  const [completedTodos,setCompletedTodos] = useState([])
  
 const handleAddTodo = () => {
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    }

  let updatedTodo = [...allTodos]
    updatedTodo.push(newTodoItem)
    setTodos(updatedTodo)
    localStorage.setItem("todolist", JSON.stringify(updatedTodo))

  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos]
    reducedTodo.splice(index)

    localStorage.setItem('todolist', JSON.stringify(reducedTodo))
    setTodos(reducedTodo)
  }

  const handleCompletedTodo = (index) => {
    let now = new Date()
    let dd = now.getDate()
    let mm = now.getMonth() + 1
    let yyyy = now.getFullYear()
    let hr = now.getHours()
    let min = now.getMinutes()
    let sec = now.getSeconds()

    let completedOn = dd + '-' + mm + '-'+ yyyy + '  ' + hr + ':' + min + ':' + sec 

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn 
    }

    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filteredItem)
    setCompletedTodos(updatedCompletedArr)
    handleDeleteTodo(index)
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr))
  }
 
  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos]
    reducedTodo.splice(index)

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo))
    setCompletedTodos(reducedTodo)
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'))
    if(savedTodo){
      setTodos(savedTodo)
    }

    if(savedCompletedTodos){
      setCompletedTodos(savedCompletedTodos)

    }
  }, [])

  return (
    <div className="App">
      <h1>Todo's <CiBookmarkCheck className="markIcon"/></h1>
     
      <div className="todo-wrapper">
        <div className="todo-input">

          <div className = "todo-input-item">
            <label>Title</label>
            <input type="text" value = {newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="what's the task title"/>
          </div>

          <div className = "todo-input-item">
            <label>Description</label>
            <input type="text" value = {newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="what's the task description"/>
          </div>

          <div className = "todo-input-item">
            <button type ="button" onClick={handleAddTodo} className = "primarybtn" >Add</button>
          </div>

        </div>

        <div className="btn-area">
          <button className = {`secondarybtn ${isCompleteScreen === false && 'active'}`} 
          onClick = {() => setIsCompleteScreen(false)}>Todo</button>
          
          <button className = {`secondarybtn ${isCompleteScreen === true && 'active'}`} 
          onClick = {() => setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list-area">
          
          {isCompleteScreen === false && allTodos&&allTodos.map((item,index ) => {
            return(
              <div className = "todo-list-item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>

            <div>
            <TiDelete className="deleteIcon" onClick={() => handleDeleteTodo(index)} title="Delete"/>
            <MdLibraryAddCheck className="checkIcon" onClick={() =>handleCompletedTodo(index)  } title="Complete"/>
            </div>
 
          </div>
            )
          })} 

          {isCompleteScreen === true && completedTodos && completedTodos.map((item,index ) => {
            return(
              <div className = "todo-list-item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed on: {item.completedOn}</small></p>
            </div>

            <div>
            <TiDelete className="deleteIcon" onClick={() => handleDeleteCompletedTodo(index)} title="Delete"/>
            </div>
 
          </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default App;
