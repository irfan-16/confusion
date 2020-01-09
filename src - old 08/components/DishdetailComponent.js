import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";




    function RenderDish ({dish}) {
        //console.log(dish)
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
    function RenderComment({dish}) {
      //console.log(dish)
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

    const DishDetail = (props) => {
        console.log("DishDetail Component render is invoked");
        
        return (
            <div className="container">
                <div className="row">
                    <div  className="col-md-5 m-1">
                        <RenderDish dish={props.dishDetail} />
                    </div>
                    <div  className="col-md-5 m-1">
                        <RenderComment dish={props.dishDetail} />
                    </div>
                </div>
            </div>
        )

    }

export default DishDetail;