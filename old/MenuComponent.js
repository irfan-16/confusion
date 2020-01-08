import React, {Component} from "react";
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from "reactstrap";
import DishDetail from "./DishdetailComponent";

class Menu extends Component {

    constructor (props) {
        super(props);

        this.state={
            selectedDish: null
        }
    }

   

    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }

    render() {

        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardImgOverlay>
                            <CardTitle >{dish.name}</CardTitle>
                         </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        console.log("menu componnet render is invoked");

        return (
            <div className="container">
                <div className="row">
                    {menu}
                 </div>
                 <div>
                    <DishDetail dishDetail={this.state.selectedDish} />
                 </div>
            </div>
         );
    }
}

export default Menu;