import React from "react"
import CardInfo from "./CardInfo"
import "../index.css"


function Card(props) {
  return (
      <div className="d-inline-block e-card" onClick={(e) => props.click(props.item)}>
          <img className="e-card-image" src={props.item.imgSrc} alt={props.item.alt} />
          {props.item.selected && <CardInfo title={props.item.title} subtitle={props.item.subtitle} linkProject={props.item.linkProject} linkCode={props.item.linkCode}/>}
      </div>
  )
  
}

export default Card