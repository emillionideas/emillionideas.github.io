import React from "react"
import { useSpring, animated } from "react-spring"
import "../index.css"

function CardInfo(props) {
    const style = useSpring({opacity: 1, from: {opacity: 0}})
   return (
       <animated.div className="" style={style}>
           <p className="e-card-title">{props.title}</p>
           <p className="e-card-subtitle">{props.subtitle}</p>
           <a href={props.link} target="_blank" rel="noopener noreferrer">View</a>
       </animated.div>
   )
}

export default CardInfo