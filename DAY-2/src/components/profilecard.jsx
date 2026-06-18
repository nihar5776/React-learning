// import React from 'react'
import "./profileCard.css"
function profilecard() {

    const name = "Nihar";
    const age = 21;
    const country = "India";
     return(
    <div className="card">
        <p>Name :{name}</p>
        <p>Age :{age}</p>
        <p>Country:{country}</p>
    </div>
         )
}

export default profilecard
