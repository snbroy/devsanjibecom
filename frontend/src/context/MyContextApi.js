import React, { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { serverUrl } from '../helper/helper';
export const CreateContextApi = createContext();
export const ContextProvider = ({ children }) => {
    const { cart } = useSelector((state) => state);
    const [products, setProducts] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [categoriesA, setCategoriesA] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [offset, setOffset] = useState(false);
    const [paymentId, setPaymentId] = useState('');
    const [user, setUser] = useState(null);

    const API_URL = "https://api.escuelajs.co/api/v1/products";
    const CAT_PRODUCTS_URL = "https://api.escuelajs.co/api/v1/categories"
    const [loading, setLoading] = useState(false);
  
    async function fetchProductData() {
      setLoading(true);
  
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.length === 0) {
          return false
        }
        setProducts(data);
        const categories = data.map((product) => {
          
          return {name:product.category.name, img: product.category.image}
        });
        const uniqueCategories = categories.filter((category, index, self) =>
          index === self.findIndex((c) => (
            c.name === category.name && c.img === category.img
          ))
        );
        console.log(uniqueCategories, "uniqueCategories")
        setCategoriesA(uniqueCategories);
      }
      catch (err) {
        alert("Error");
        setProducts([]);
      }

      // try {
      //   const res = await fetch(CAT_PRODUCTS_URL);
      //   const data = await res.json();
      //   if (data.length === 0) {
      //     return false
      //   }
      //   console.log(data, "data")
      //   setCategoriesA(data);
        
      // } catch (error) {
      //   alert("Error");
      //   setCategoriesA([]);
      // }
      
      setLoading(false);
    }
    useEffect(()=>{
      localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])
    useEffect(() => {
      fetchProductData();
    }, []);

    console.log(products, "products")

    return (
        <CreateContextApi.Provider value={{ products, openDrawer, setOpenDrawer, categoriesA, loading, searchResult, setSearchResult, offset, setOffset, setPaymentId, mobileNavOpen, setMobileNavOpen, user, setUser }}>
            {children}
        </CreateContextApi.Provider>
    );
}