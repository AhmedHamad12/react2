import React, { useState } from "react";
import Footer from "../component/HomePage components/Footer";
import SearchBar from "../component/Shop Component/SearchBar";
import Header from "../component/Shop Component/Header";
import ProductList from "../component/Shop Component/ProductList";
import "../styles/shop.css";
import FilterButtons from "../component/Shop Component/FilterButtons";
import axios from "axios";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const products = [
    {
      id: 1,
      image: "https://img.ltwebstatic.com/images3_pi/2023/11/22/fa/17006361752316219a16875ca061a29a8b2caac3a3_thumbnail_405x552.jpg",
      sizes: ["S", "M", "L", "XL"],
      price: "550.00 LE",
      oldPrice: "700.00 LE",
      colors: ["black", "red", "blue"],
      category: "men",
      title: "Men's Jacket",
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-photo/woman-showing-clothes-customer_23-2148929526.jpg?ga=GA1.1.20943852.1670077444&semt=ais_hybrid",
      sizes: ["M", "L", "XL", "XXL"],
      price: "600.00 LE",
      oldPrice: "750.00 LE",
      colors: ["green", "yellow", "purple"],
      category: "women",
      title: "Women's Dress",
    },
    {
      id: 3,
      image: "https://img.freepik.com/free-photo/full-length-portrait-cute-little-girl-hat_171337-13768.jpg?ga=GA1.1.20943852.1670077444&semt=ais_hybrid",
      sizes: ["M", "L", "XL", "XXL"],
      price: "500.00 LE",
      oldPrice: "650.00 LE",
      colors: ["blue", "white", "gray"],
      category: "children",
      title: "Children's Dress",
    },
    {
      id: 4,
      image: "https://media.istockphoto.com/id/171280820/photo/young-girl-wearing-pajamas-jumping-on-bed.jpg?s=612x612&w=0&k=20&c=qUp30QSHGAo8KOBA-g7-ktKTjONEj73hwU7X-WkEo_w=",
      sizes: ["M", "L", "XL", "XXL"],
      price: "600.00 LE",
      oldPrice: "800.00 LE",
      colors: ["green", "yellow", "purple"],
      category: "children",
      title: "Children's Pajama",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sizes: ["M", "L", "XL", "XXL"],
      price: "450.00 LE",
      oldPrice: "600.00 LE",
      colors: ["blue", "white", "gray"],
      category: "men",
      title: "Men's Shirt",
    },
    {
      id: 6,
      image: "https://img.freepik.com/premium-photo/smiling-confidently-pointing-own-broad-smile_1194-425801.jpg?ga=GA1.1.20943852.1670077444&semt=ais_hybrid",
      sizes: ["M", "L", "XL", "XXL"],
      price: "500.00 LE",
      oldPrice: "650.00 LE",
      colors: ["green", "yellow", "purple"],
      category: "women",
      title: "Women's Blouse",
    },
    {
      id: 7,
      image: "https://img.freepik.com/premium-photo/stylish-young-woman-showcases-autumn-fashion-chic-studio-setting_1326977-7385.jpg?w=360",
      sizes: ["M", "L", "XL", "XXL"],
      price: "570.00 LE",
      oldPrice: "750.00 LE",
      colors: ["green", "yellow", "purple"],
      category: "women",
      title: "Women's Sweater",
    },
    {
      id: 8,
      image: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/c49ccc7e3f5d2601734413c87cdf619c.jpg",
      sizes: ["M", "L", "XL", "XXL"],
      price: "500.00 LE",
      oldPrice: "650.00 LE",
      colors: ["blue", "white", "gray"],
      category: "men",
      title: "Men's Coat",
    },
  ];

  const categories = ["All", "men", "women", "children"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sizes.some((size) => size.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.oldPrice.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || product.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const handleBuy = async (product) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You need to be logged in to add products to the basket.");
      return;
    }

    let basket = JSON.parse(localStorage.getItem("basket")) || {
      id: token,
      items: [],
      paymentIntentId: "string",
      clientSecret: "string",
      deliveryMethodId: 0,
    };

    const basketItem = {
      id: product.id,
      name: product.title,
      pictureUrl: product.image,
      brand: "default-brand",
      type: "default-type",
      price: parseFloat(product.price.replace(" LE", "")) || 0,
      quantity: 1,
    };

    const existingItemIndex = basket.items.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      basket.items[existingItemIndex].quantity += 1;
    } else {
      basket.items.push(basketItem);
    }

    localStorage.setItem("basket", JSON.stringify(basket));

    try {
      const response = await axios.post("https://localhost:7251/api/Basket", basket, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Added to basket:", response.data);
    } catch (error) {
      console.error("Error adding to basket:", error);
    }
  };

  return (
    <div className="app">
      <Header />
      <SearchBar onSearch={setSearchTerm} />
      <FilterButtons categories={categories} onFilter={setFilterCategory} />
      <ProductList products={filteredProducts} onBuy={handleBuy} />
      <Footer />
    </div>
  );
};

export default Shop;
