import React, { useState,useContext,createContext } from 'react'

const AppContext = createContext()


export const CartProvider =({ children })=> {
    const [cartId, setcartId] = useState({
        cartId:null ,
        userId :null
    });
    console.log(cartId);
    
  return (
    <AppContext.Provider value={{cartId , setcartId}}>
        {children}
    </AppContext.Provider>
  )
}

export const useCartContext = () => {
    return useContext(AppContext);
}

export default AppContext;