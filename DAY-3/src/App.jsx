// import React from 'react'
// import "./App.css";
// import Child from "./components/Child.jsx"

// function App() {
//   const name = "Nihar";
//   const age = 20;

//   return (
//     <div>
//      <Child name ={name} age = {age}/>      
//     </div>
//   )
// }

// export default App


import React from 'react'
import "./App.css"
import Child from './components/Child'
import image1 from './assets/amazing-spiderman.webp'
import image2 from "./assets/brand-new-day.jpeg"
import image3 from "./assets/nowayhome.jpeg"


function App() {
  return (
    <div>
     <Child img1 = {image1} img2 = {image2} img3 = {image3} />      
    </div>
  )
}

export default App
