import React, { useEffect } from 'react';
import './App.css';
import { Card, CardContent } from '@mui/material';
import FoodCard from './components/foodCard/card';
import SearchAppBar from './components/navbar/navbar';
import PaginationRounded from './components/pagination/pagination';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import addNewMeal from './components/addNewMeal/addNewMeal';
import { getAllMeals } from './service';

const navItems = ['Home', 'About', 'Contact', ];

const foodData = {
  photoUrl: 'https://tse3.mm.bing.net/th?id=OIP.RqFWzaZfizWbu-DOEsIL8wHaFW&pid=Api&P=0&h=220',
  name: 'Pilav',
  description: 'Most beloved meal in Central Asia',
  ingredients: [{value: 'oil'}, {value: 'onion'}, ],
  cookTime: '30',
}

function App() {

  useEffect(() => {
    getAllMeals()
    .then((data: any) => {
         console.log(data)
    }).catch(console.log)
  }, [])

 const  handleHelloWord = () => {
    console.log('hello world')
  };
  
  const homePage = () => (
    <div className="App">
    <SearchAppBar />
  <Card sx={{ maxWidth: '60rem' }} >
    <CardContent sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
       {navItems.map((_, index) => <FoodCard key={index} foodData={foodData}/>)}
    </CardContent>
    <PaginationRounded />
  </Card>
  </div>
  )

  return (
      <Router>
        <Routes>
        <Route path='/' Component={homePage} />
        <Route path='/new' Component={addNewMeal} />
        </Routes>
      </Router>
    
  );
}

export default App;
