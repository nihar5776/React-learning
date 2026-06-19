// import React from 'react'

// function Child(prop) {
//   return (
//     <div>
//       <p>{prop.name}</p>
//       <p>{prop.age}</p>
//     </div>
//   )
// }

// // // Destructring od props
// // function Child({name,age}) {
// //   return (
// //     <div>
// //       <p>{name}</p>
// //       <p>{age}</p>
// //     </div>
// //   )
// // }

// export default Child

import React from 'react'
import "./Child.css"

const Child = ({ img1, img2, img3 }) => {
  return (
    <div className="container">
      <div className="image-card">
        <img src={img1} alt="Image 1" />
      </div>

      <div className="image-card">
        <img src={img2} alt="Image 2" />
      </div>

      <div className="image-card">
        <img src={img3} alt="Image 3" />
      </div>
    </div>
  )
}

export default Child

