import React from "react"

export const StoreManager = React.createContext()


export const StoreProvider = ({children}) => {
   const [data, setData] = React.useState(null);
   const colors = ['#01C7AE', '#F34B34', '#E6C618', '#dfc9c9']

     const getData = () => {
         let storage = window.localStorage.getItem('store')
         if (!storage) {
             let _tmp = [
                {
                   id: 21341412,
                   name: 'Start',
                   color: '#01C7AE',
                   listData: [
                      {
                         id: 1,
                         text: 'Create list',
                         value: true
                      },
                      {
                         id: 2,
                         text: 'Add some tasks',
                         value: true
                      },
                      {
                         id: 3,
                         text: 'Add more tasks',
                         value: false
                      },
                   ]
                },
                {
                   id: 21341415,
                   name: 'Shopping',
                   color: '#E6C618',
                   listData: [
                      {
                         id: 4,
                         text: 'potato',
                         value: false
                      },
                      {
                        id: 5,
                        text: 'tomato',
                        value: false
                     },
                     {
                        id: 6,
                        text: 'meat',
                        value: false
                     },
                     {
                        id: 7,
                        text: 'snacks',
                        value: false
                     },
                   ]
                }
                
                
             ]
             setData(_tmp)
             window.localStorage.setItem('store', JSON.stringify(_tmp))
         } else {
             setData(JSON.parse(storage))
         }
     }

     const updDataHandler = (value) => {
        setData(value)
        window.localStorage.setItem('store', JSON.stringify(value))
     }

     React.useEffect(() => {
        getData()
     }, [])

    return (
        <StoreManager.Provider value={{
            data: {data, updDataHandler},
            colors: {colors}
        }}>
            {children}
        </StoreManager.Provider>
    )
}
