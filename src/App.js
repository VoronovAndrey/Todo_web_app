import * as React from 'react'
import ListItem from './components/ListItem';
import Menu from './components/Menu';
import NewListModal from './components/NewListModal';
import { StoreManager } from './context/Context';
import './style.css'
import TodoList from './TodoList';


function App() {
   const { data: { data, updDataHandler } } = React.useContext(StoreManager)

   const [showModal, setShowModal] = React.useState(false)   

   const addNewList = (title, color) => {
      if (title !== '') {
         let new_item = {
            id: Date.now(),
            name: title,
            color: color,
            listData: []
         }
         updDataHandler([...data, new_item])
         // listName_ref.current.value = ''
      } else {
         window.alert('Name is empty')
      }
   }
   const [mainPage, setMainPage] = React.useState(true)
   const [CurrentListIndex, setCurrentListIndex] = React.useState(null)

   const setDataHandler = (new_data, idx) => {
      let tmp = [...data]
      tmp[idx].listData = new_data
      updDataHandler([...tmp])

   }

   React.useEffect(() => {
      console.log(data);
   }, [data])
   React.useEffect(() => {
      console.log('CurrentListIndex', CurrentListIndex);
   }, [CurrentListIndex])


   if (!data) {
      return <p>Loading</p>
   }
   return (
      <div className="app__container">
         <Menu click={(index) => {
                           if ( index  !== CurrentListIndex ) {
                              if (index !== null) {
                                 setCurrentListIndex(null)
                                 setTimeout(() => {
                                    setCurrentListIndex(index)
                                 }, 10);
                                 setMainPage(false)
                              } else {
                                 setCurrentListIndex(null)
                                 setMainPage(true)
                              }
                           }
                        }}
               addClick={() => setShowModal(true)}
                        />
         <div className='main_layout__container'>
            {showModal && (
               <NewListModal
                  addNewList={addNewList}
                  closeModal={() => setShowModal(false)}
               />
            )}


            {/* <TodoList data={data} /> */}
            {mainPage && (
               <>
                  <div>
                     {/* <input ref={listName_ref} placeholder='Name'></input> */}
                     <button onClick={() => setShowModal(true)}
                        className='btn__create_new_list'
                     >
                        <span>
                           <i className="fas fa-plus"></i>
                        </span> Create new list</button>
                  </div>
                  <div className='list__main__container'>
                     {data.map((list, index) => {
                        return <ListItem data={list} key={index}
                           click={() => {
                              setCurrentListIndex(index)
                              setMainPage(false)
                           }} />
                     })}
                  </div>
               </>
            )}
            {(mainPage === false) && (CurrentListIndex !== null) && (
               <>
                  <TodoList data={data[CurrentListIndex].listData}
                     back={() => {
                        setCurrentListIndex(null)
                        setMainPage(true)
                     }}
                     setDataHandler={setDataHandler}
                     dataIndex={CurrentListIndex}

                  />
               </>
            )}

         </div>
      </div>
   );
}

export default App;
