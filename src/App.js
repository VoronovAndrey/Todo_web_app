import * as React from 'react'
import ListItem from './components/ListItem';
import Menu from './components/Menu';
import { StoreManager } from './context/Context';
import './style.css'
import TodoList from './TodoList';


function App() {
   const { data: { data, updDataHandler } } = React.useContext(StoreManager)
   

   const addNewList = () => {
      if (listName_ref.current.value !== '') {
         let new_item = {
            id: Date.now(),
            name: listName_ref.current.value,
            listData: []
         }
         updDataHandler([...data, new_item])
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
      updDataHandler([...tmp])

   }
   React.useEffect(() => {
      console.log(data);
   }, [data])
   React.useEffect(() => {
      console.log('currentListData', currentListData);
   }, [currentListData])


   if (!data) {
      return <p>Loading</p>
   }
   return (
      <div className="app__container">
         <Menu click={(index) => {
                           if ( index  !== currentListData ) {
                              if (index !== null) {
                                 setCurrentListData(null)
                                 setTimeout(() => {
                                    setCurrentListData(index)
                                 }, 10);
                                 setMainPage(false)
                              } else {
                                 setCurrentListData(null)
                                 setMainPage(true)
                              }
                           }
                        }}/>
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
                        }} />
                  })}
               </>
            )}
            {(mainPage === false) && (currentListData !== null) && (
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
