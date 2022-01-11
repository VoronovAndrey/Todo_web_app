import * as React from 'react'
import ListItem from './components/ListItem';
import './style.css'
import TodoList from './TodoList';

function App() {
   const [data, setData] = React.useState([
      {
         id: 21341412,
         name: 'List1',
         listData: [
            {
               id: 1,
               text: '1asdsasf afgaads',
               value: false
            },
            {
               id: 2,
               text: '2asdsasf afgaads',
               value: true
            },
            {
               id: 3,
               text: '3asdsasf afgaads',
               value: false
            },
         ]
      },
      {
         id: 21341415,
         name: 'List2',
         listData: [
            {
               id: 4,
               text: '4asdsasf afgaads',
               value: false
            }
         ]
      }
      
      
   ]);

   const addNewList = () => {
      if (listName_ref.current.value !== '') {
         let new_item = {
            id: Date.now() ,
            name: listName_ref.current.value,
            listData: []
         }
         setData([...data, new_item])
         listName_ref.current.value = ''
      } else {
         window.alert('Name is empty')
      }
   }
   const listName_ref = React.useRef('')
   const [mainPage, setMainPage] = React.useState(true)
   const [currentListData, setCurrentListData] = React.useState(null)

   const setDataHandler = (new_data, idx) => {
      let tmp = [...data]
      tmp[idx].listData = new_data
      setData([...tmp])

   }

   React.useEffect(() => {
      console.log(data);
   }, [data])
   React.useEffect(() => {
      let storage = localStorage.getItem('stor')
      console.log(storage);
   }, [])


  return (
    <div className="app__container">
       <div className='menu__container'>
          <p>Projects</p>
          <ul>
             {
             data.map((list, index) => {
            return <li key={index}>{list.name}</li>
         })}
          </ul>
          
       </div>
       <div className='main_layout__container'>
         
          
         {/* <TodoList data={data} /> */}
           {mainPage && (
              <>
                 <div>
                    <input ref={listName_ref} placeholder='Name'></input>
                    <button onClick={addNewList}>Add new list</button>
                 </div>
                 {data.map((list, index) => {
                    return <ListItem data={list} key={index} 
                                       click={() => {
                                          setCurrentListData(index)
                                          setMainPage(false)
                                       }}/>
                 })}
              </>
           )}
           {mainPage === false && (
              <>
               <TodoList data={data[currentListData].listData} 
                        back={() => {
                           setCurrentListData(null)
                           setMainPage(true)
                        }}
                        setDataHandler={setDataHandler}
                        dataIndex={currentListData}
                        
               />
              </>
           )}
         
       </div>
    </div>
  );
}

export default App;
