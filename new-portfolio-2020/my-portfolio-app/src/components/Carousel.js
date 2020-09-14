import React from "react"
import Card from "./Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import SampleCard from "../assets/SampleCard.png"
import OnceUponADoor from "../assets/OnceUponADoor.png"
import PianoForDummies from "../assets/PianoForDummies.png"

class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                {
                    id: 0,
                    title: "Once Upon A Door",
                    subtitle: "[Project Description]",
                    imgSrc: OnceUponADoor,
                    alt: "once-upon-a-door",
                    linkProject: 'https://emily8385.github.io/chore-door/',
                    linkCode: 'https://www.emilyphuctran.com/',
                    selected: false
                },
                {
                    id: 1,
                    title: "Piano For Dummies",
                    subtitle: "[Project Description]",
                    imgSrc: PianoForDummies,
                    alt: "project 2",
                    linkProject: 'https://emily8385.github.io/piano-key/',
                    linkCode: 'https://www.emilyphuctran.com/',
                    selected: false
                },
                {
                    id: 2,
                    title: "My First React Portfolio",
                    subtitle: "[Project Description]",
                    imgSrc: SampleCard,
                    alt: "project 3",
                    linkProject: 'https://www.emilyphuctran.com/',
                    linkCode: 'https://www.emilyphuctran.com/',
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