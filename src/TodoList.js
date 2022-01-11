import * as React from 'react'
import AddNewItem from './components/AddNewItem';
import TodoItem from './components/TodoItem';
import './style.css'

function TodoList(props) {
   const [data, setData] = React.useState([]);
   const checkHandle = (idx) => {
      let tmp = [...data]
      tmp[idx].value = !tmp[idx].value
      setData(tmp)
   }
   const removeHandle = (idx) => {
      let tmp = [...data]
      tmp.splice(idx, 1)
      
      setData(tmp)
   }
   const addHandle = (text) => {
      let tmp = {
         id: Date.now(),
         text: text,
         value: false
      }
      
      
      setData([...data, tmp])
   }
   React.useEffect(() => {
      setData(props.data)
   }, [])
   React.useEffect(() => {
      console.log(data);
      return () => {
      }
   }, [data])

  return (
    <div>
       <button onClick={()=> props.back()}>← Back</button>

       <AddNewItem addHandle={addHandle}/>

       {data.map((todo, idx) => {
          return <TodoItem text={todo.text}
                           key={idx}
                           value={todo.value}
                           id={todo.id}
                           checkHandle={() => checkHandle(idx)} 
                           removeHandle={() => removeHandle(idx)} />
       })}
    </div>
  );
}

export default TodoList;
