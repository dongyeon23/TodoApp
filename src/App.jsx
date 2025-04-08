import { use, useState } from 'react'
import './App.css'

function App() {
  const [todoList, setTodoList] = useState([{id:0, content: "공부하기", isDone: false, isEditing: false}
  ])
  const [inputValue, setInputValue] = useState('')

  return (  
    <>
      <TodoList todoList={todoList} setTodoList={setTodoList}/>
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList}/>
    </>
  )
}

function TodoInput ({todoList,setTodoList}) {
  const [inputValue, setInputValue] = useState('')

  return (
    <>
    <input value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
    <button onClick={()=> {
      const newTodo = {
        id: Number(new Date()), content: inputValue
      }
      const newTodoList = [...todoList, newTodo];
      setTodoList(newTodoList); //매개변수로 받은 뉴투두리스트
      setInputValue('')
      console.log(newTodo)
    }}>추가하기</button>
    </>
  )
}

function TodoList({ todoList, setTodoList }) {
return (
    <ul>
      {todoList.map((todo) => ( //key속성은 map 안에서 작성해야함
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList}/>
      ))}
    </ul>
    );
} 
function Todo ({todo, setTodoList}) {
  const [inputValue, setInputValue] = useState('')
  console.log('현재 todo 객체:', todo)
  return (
    <li style={{textDecoration: todo.isDone ? "line-through" : "none"}}>
      {todo.content}
    <input style={{display: todo.isEditing ? 'inline-block' : 'none'}} value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>

    <button onClick={()=>{
      if(!todo.isEditing){
        setInputValue(todo.content)
        setTodoList(prev => prev.map(el => el.id === todo.id ?{...el, isEditing: true}:el))
        setInputValue('')
      } else {
        setTodoList(prev => prev.map(el => el.id === todo.id ?{...el, content: inputValue,isEditing: false}:el))
      }
    }}
    >
      {todo.isEditing ? '저장':'수정'}
    </button>

    {/* <button onClick={()=>{
      setTodoList(prev => prev.map(el => el.id === todo.id? {...el, content:inputValue, isEditing: !el.isEditing}: el))
      setInputValue('')
    }}
    >
      {todo.isEditing ? '저장':'수정'}
    </button> */}

      <button onClick={()=> {
        setTodoList(prev => {
          return prev.filter((el) => el.id !== todo.id);
        })
      }}
      >
        삭제
      </button>

      <button onClick={()=> {
        setTodoList(prev => {
          return prev.map((el) => el.id === todo.id?{...el, isDone:!el.isDone}:el);
        })
      }}
      >
        {todo.isDone ? '취소':'완료'}
      </button>
    </li>
  )
}
export default App
