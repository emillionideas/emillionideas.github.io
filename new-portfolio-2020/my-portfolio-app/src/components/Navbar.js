import React from "react"
import "./element.css"
function Navbar() {
  return (
      <div>
        <ul>
          <li><a href="default.asp">About</a></li>
          <li><a href="news.asp">Illustration</a></li>
          <li><a href="contact.asp">Web Development</a></li>
          <li><a href="about.asp">Graphic Design</a></li>
          <li style={{float: "left"}}><a href="about.asp">Logo</a></li>
        </ul>
      </div>
  )
}
export default Navbar