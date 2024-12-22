import React, { useContext, useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/Admin Panel Assets/cross_icon.png'

const ListProduct = () => {

  const[allproducts,setAllProducts] = useState([]);

  const fetchinfo = async ()=> {
    await fetch('https://velour-backend.onrender.com/allproducts').then((resp)=> resp.json()).then((data)=> {setAllProducts(data)});
  }

  useEffect(()=>{
    fetchinfo();
  },[])

  const remove_product = async (id)=>{
    await fetch('https://velour-backend.onrender.com/removeproduct',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id: id})
    })
    await fetchinfo();
  }

  return (
    <div className='listproduct'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts" >
          <hr />
          {allproducts.map((product,index)=>{
            return <>
            <div key={index} className="listproduct-format-main listproduct-format">
              <img className='listproduct-product-icon' src={product.image} alt="" />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>{product.category}</p>
              <img onClick={()=> {remove_product(product.id)}} className='listproducts-remove-icon' src={cross_icon} alt="" />
            </div> 
            <hr />
            </>
          })}
        </div>
    </div>
  )
}

export default ListProduct
