import React from "react"

function Card(props) {
  return (
      <div>
          <img className="" src={props.imgSrc} alt={props.alt} />
      </div>
  )
  
}

export default Card