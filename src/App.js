import * as React from 'react'
import ListItem from './components/ListItem';
import Menu from './components/Menu';
import NewListModal from './components/NewListModal';
import { StoreManager } from './context/Context';
import './style.css'
import TodoList from './TodoList';

import Img from './images/13-ai.png'
import Filter from './components/Filter';


function App() {
   const { data: { data, updDataHandler } } = React.useContext(StoreManager)
   const [colorFilter, setColorFilter] = React.useState(null)
   const [filtredData, setFiltredData] = React.useState(null)

   const [showModal, setShowModal] = React.useState(false)  

   const [mainPage, setMainPage] = React.useState(true)
   const [CurrentListIndex, setCurrentListIndex] = React.useState(null)

   const [editIndex, setEditIndex] = React.useState(null)

   const [message, setMessage] = React.useState('')
   const [visibility, setVisibility] = React.useState(false)

   const addNewList = (title, color) => {
      if (title !== '') {
         let new_item = {
            id: `List_${Date.now()}`,
            name: title,
            color: color,
            listData: []
         }
         updDataHandler([...data, new_item])
         setMessage('List created!')
      } 
   }

   const changeList = ( title, color, listId) => {
      if (title !== '') {
         let tmp = []
         let idx = 0
         for ( let i = 0; i < data.length; i++ ) {
            if (data[i].id === listId) {
               tmp.push(data[i])
               idx = i;
            }
         }
         tmp[0].name = title;
         tmp[0].color = color;
         let tmp_data = [...data]
         tmp_data[idx] = tmp[0]
         updDataHandler(tmp_data)
         setMessage('List changed!')
      }
   }

   const setDataHandler = (new_data, idx) => {
      let tmp = [...data]
      tmp[idx].listData = new_data
      updDataHandler([...tmp])
   }

   const deleteClickHandler = (index) => {
      let tmp = [...data]
      tmp.splice(index, 1)
      updDataHandler([...tmp])
   }

   const indexOfId = (id) => {
      let index = data.findIndex(item => item.id === id)
      console.log('indexOfId',index);
      return index
   }

   React.useEffect(() => {
      if (message !== '') {
         setVisibility(true)
         setTimeout(() => {
            setVisibility(false)
            setTimeout(() => {
               setMessage('')
            }, 200);
         }, 1000);
      }
   }, [message])

   React.useEffect(() => {
      if ( colorFilter === null ) return setFiltredData(null)
      if ( colorFilter !== null) {
         let filtred = data.filter(item => item.color === colorFilter)
         setFiltredData(filtred)
      }
   }, [colorFilter, data])

   if (!data) {
      return <p>Loading</p>
   }
   return (
      <div className="app__container">
         <Notification text={message} visibility={visibility} />

         <Menu addClick={() => setShowModal(true)} 
            click={(index) => {
                           if ( (index !== null) && (index  !== CurrentListIndex) ) {
                              setCurrentListIndex(null)
                              setTimeout(() => {
                                 setCurrentListIndex(index)
                              }, 10);
                              setMainPage(false)
                           } 
                           if (index === null) {
                              setCurrentListIndex(null) 
                              setMainPage(true)
                              setColorFilter(null)
                           }
                        }}/>
         <div className='main_layout__container'>
            {showModal && (
               <NewListModal
                  isEdit={false}
                  okClick={addNewList}
                  closeModal={() => setShowModal(false)}
               />
            )}

            { editIndex !== null && (
                  <NewListModal
                     isEdit={true}
                     okClick={changeList}
                     editData={data[editIndex]}
                     closeModal={() => setEditIndex(null)}
                  />
               )
            }

            {/* mainPage = true -> show filters and all lists */}
            {mainPage && (
               <>
                  <div>
                     <button onClick={() => setShowModal(true)}
                        className='btn__create_new_list'
                     >
                        <span>
                           <i className="fas fa-plus"></i>
                        </span> Create new list</button>
                  </div>

                  <Filter colorFilter={colorFilter} setColorFilter={setColorFilter} />
                  
                  <div className='list__main__container'>
                     {filtredData === null && (
                        data.map((list, index) => {
                           return <ListItem data={list} key={index}
                              click={() => {
                                 setCurrentListIndex(index)
                                 setMainPage(false)
                              }} 
                              deletClick={() => deleteClickHandler(index)}
                              editClick={() => setEditIndex(index)}
                              />
                        })
                     )}
                     {filtredData !== null && (
                        filtredData.map((list, index) => {
                           return <ListItem data={list} key={index}
                              click={() => {
                                 setCurrentListIndex( indexOfId(list.id) )
                                 setMainPage(false)
                                 
                              }}
                              deletClick={() => deleteClickHandler( indexOfId(list.id) )}
                              editClick={() => setEditIndex( indexOfId(list.id) )}
                           />
                        })
                     )}
                  </div>
                  {data.length === 0 && (
                     <div className='image__container'>
                        <p>Create your first list!</p>
                        <img src={Img} alt='' className='image'></img>
                     </div>
                  )}
               </>
            )}
            {(mainPage === false) && (CurrentListIndex !== null) && (
               <>
                  <TodoList data={data[CurrentListIndex]}
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


const Notification = ({text, visibility}) => {
   return (
       <div className='notfication' style={{
          right: visibility ? '20px' : '-300px',
          visibility: visibility ? 'visible' : 'hidden'
       }}>
           <p>{text}</p>
       </div>
   )
}

export default App;
