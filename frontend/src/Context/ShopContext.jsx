import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
         cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {

    const [all_product,setAll_Product] = useState([]);

    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
    fetch('https://velour-backend.onrender.com/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_Product(data)); 

        if(localStorage.getItem('auth-token')){
            fetch('https://velour-backend.onrender.com/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
}, [])

const addToCart = (itemId) => {
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
    if(localStorage.getItem('auth-token')){
        fetch('https://velour-backend.onrender.com/addtocart',{
            method: 'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"itemId":itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data));
    }

}
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(localStorage.getItem('auth-token')){
            fetch('https://velour-backend.onrender.com/removefromcart',{
                method: 'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }   
        
    };

    const getTotalCartAmount = ()=> {
        let TotalAmount=0;
        for ( const item in cartItems)
        {
            if (cartItems[item]>0)
            {
                let iteminfo = all_product.find((product)=> product.id===Number(item))  
                TotalAmount+= iteminfo.price * cartItems[item];  
            }
        }
        return TotalAmount;
    };

    const getTotalCartItems = ()=> {
        let totalItem=0;
        for (const item in cartItems)
        {
            if (cartItems[item] >0)
            {
                totalItem+= cartItems[item];
            }       
        }
        return totalItem;
    }

    const ContextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};

    return (
        <ShopContext.Provider value={ContextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
