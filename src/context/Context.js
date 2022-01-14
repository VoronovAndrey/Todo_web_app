import React from "react"

export const StoreManager = React.createContext()


export const StoreProvider = ({children}) => {
   const [data, setData] = React.useState(null);
   const colors = ['#01C7AE', '#F34B34', '#E6C618', '#EDE6E6']

     const getData = () => {
         let storage = window.localStorage.getItem('store')
         if (!storage) {
             let _tmp = [
                {
                   id: 21341412,
                   name: 'List1',
                   color: '#01C7AE',
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
                   color: '#01C7AE',
                   listData: [
                      {
                         id: 4,
                         text: '4asdsasf afgaads',
                         value: false
                      }
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
