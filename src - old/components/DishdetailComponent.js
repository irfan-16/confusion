import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";


class DishDetail extends Component {

    componentDidMount() {
        console.log("DishDetail Component componentDidMount is invoked");
    }

    componentDidUpdate() {
        console.log("DishDetail Component componentDidUpdate is invoked");
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <div>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>

                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
    renderComment(dish) {
        if (dish != null) {
            return (
                <div >
                    <Card >
                            <div className="col-md-12 m-1">
                                <h4>Comments</h4>
                            </div>
                            {dish.comments.map((comment) => {
                            return(                        
                                <div key={comment.id}>
                                    <div>
                                        <div className="row">
                                            <ul>{comment.comment}</ul>
                                        </div>
                                        <div className="row">
                                            <ul>-- {comment.author}</ul>
                                            <ul>{new Intl.DateTimeFormat("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit"
                                                }).format(new Date(comment.date))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                            
                        })}
                    </Card>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    render() {
        console.log("DishDetail Component render is invoked");
        console.log(this.props.dishDetail);
        return (
            <div className="container">
                <div className="row">
                    <div  className="col-md-5 m-1">
                        {this.renderDish(this.props.dishDetail)}
                    </div>
                    <div  className="col-md-5 m-1">
                        {this.renderComment(this.props.dishDetail)}
                    </div>
                </div>
            </div>
        )

    }
}

export default DishDetail;