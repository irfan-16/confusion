import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import {Link} from 'react-router-dom';




    function RenderDish ({dish}) {
        console.log("dish render invoked ", dish)
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
    function RenderComment({dishComments}) {
      console.log("dish comments invoked ",dishComments)
        if (dishComments != null) {
            return (
                <div >
                    <Card >
                            <div className="col-md-12 m-1">
                                <h4>Comments</h4>
                            </div>
                            {dishComments.map((comment) => {
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
        return (
            <div className="container mr-10">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem> 
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div  className="col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div  className="col-md-5 m-1">
                        <RenderComment dishComments={props.comments} />
                    </div>
                </div>
            </div>
        )

    }

export default DishDetail;