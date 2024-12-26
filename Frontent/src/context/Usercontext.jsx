import React, { useState,useContext,createContext } from 'react'

const AppContext = createContext()


export const UsercontextProvider=({ children })=> {
    const [user, setUser] = useState({
        userId:null,
        authStatus:false
    });
  return (
    <AppContext.Provider value={{user , setUser}}>
        {children}
    </AppContext.Provider>
  )
}

export const useUserContext = () => {
    return useContext(AppContext);
}

export default AppContext;


