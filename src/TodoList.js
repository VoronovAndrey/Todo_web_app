import * as React from 'react'
import AddNewItem from './components/AddNewItem';
import TodoItem from './components/TodoItem';
import './style.css'

function TodoList(props) {
   const [data, setData] = React.useState(null);
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
      if (data) props.setDataHandler(data, props.dataIndex)
      // console.log(data);
   }, [data])
   React.useEffect(() => {
      if (!data) setData(props.data.listData)
   }, [])

   if (!data) {
      return <p>Loading</p>
   } 
  return (
    <div>
       <button onClick={()=> props.back()}
         className='btn__back'
       >← Back</button>

       <h3 className='h3__list__title'>{props.data.name}</h3>

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
