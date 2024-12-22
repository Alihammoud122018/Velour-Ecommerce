import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/Admin Panel Assets/upload_area.svg'

const AddProduct = () => {

    const[image,setImage] =useState(false);
    const[productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"men",
        price:"",

    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const Add_Product = async ()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);
  
        await fetch('https://velour-backend.onrender.com/upload',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body:formData,
        }).then((resp)=> resp.json()).then((data)=> {responseData=data});

        if ( responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch ('https://velour-backend.onrender.com/addproduct',{
                method: 'POST',
                headers: {
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            } ).then((resp)=> resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed to Add Product")
            })
        }
    }

  return (
    <div className='addproduct'>
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='type here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder='type here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="accessories">Accessories</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct_thumbnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-button'>ADD</button>
    </div>
  )
}

export default AddProduct
