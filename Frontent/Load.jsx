import React from 'react'
import Charity from "../Frontent/src/Components/Footer/Charity"
import Footer from "../Frontent/src/Components/Footer/Footer"
import TopHead from "../Frontent/src/Components/Header/TopHead"
import MidHeader from "../Frontent/src/Components/Header/MidHeader"
import Products from "../Frontent/src/Components/Header/Products"
import LowerHeader from "../Frontent/src/Components/Header/LowerHeader"
import ProductList  from "../Frontent/src/Components/Product/ProductList"
import Company from './src/Components/Company'
function Load() {

  
  return (
    <>
     <TopHead/>
     <MidHeader/>
     <LowerHeader/>
     <Products/>
     <ProductList/>
     <Company/>
     <ProductList/>
     <Charity/>
     <Footer/>
    
    
    
    
    
    </>
  )
}

export default Load