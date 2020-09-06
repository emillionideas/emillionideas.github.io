import React from "react"
import Card from "./Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import SampleCard from "../assets/SampleCard.png"

class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                {
                    id: 0,
                    title: "Project 1",
                    subtitle: "[Project Description]",
                    imgSrc: SampleCard,
                    alt: "project 1",
                    link: 'https://www.emilyphuctran.com/',
                    selected: false
                },
                {
                    id: 1,
                    title: "Project 2",
                    subtitle: "[Project Description]",
                    imgSrc: SampleCard,
                    alt: "project 2",
                    link: 'https://www.emilyphuctran.com/',
                    selected: false
                },
                {
                    id: 2,
                    title: "Project 3",
                    subtitle: "[Project Description]",
                    imgSrc: SampleCard,
                    alt: "project 3",
                    link: 'https://www.emilyphuctran.com/',
                    selected: false
                }

            ]

        }
        this.handleCardClick = this.handleCardClick.bind(this)
    }
    handleCardClick = (id) => {
        console.log(id)
        let items = [...this.state.items]
        items[id].selected = items[id].selected ? false : true
        items.forEach(item => {
         if(item.id !== id) {
             item.selected = false
         }
        }
        )
        this.setState({
            items
        })
    }
    
    makeItems = (items) => {
        return items.map(item => {
            return <Card item={item} key={item.id} click={(e => this.handleCardClick(item.id, e))}/>
        })
    }
    
    render() {
        return(
            <Container fluid={true}>
                <Row className="justify-content-center">
                 {this.makeItems(this.state.items)}
                </Row>
            </Container>
        )
    }
}

export default Carousel