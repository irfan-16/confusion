import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from "reactstrap";
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {
/*we used class bcos we need to store some state info here */
    constructor (props) {
        super(props);
        this.state= {
            isModalOpen:false,
        };
        //this.toggleModal =this.toggleModal.bind(this);
    }


    toggleModal(){ //we use setState directly in onClick below
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log('Current state is: ' + JSON.stringify(values));
        // alert('Current state is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render () {
        return(
            <div> 
                <div className='mt-2'>
                    <Button outline onClick={(e) => this.setState({isModalOpen: !this.state.isModalOpen})}>
                        <span className='fa fa-pencil fa-lg'></span>Submit Comment
                    </Button>
                 </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.state.toggleModal}
                    >
                    <ModalHeader toggle={this.state.toggleModal}><h2>Submit Comment</h2></ModalHeader>
                    <ModalBody> 
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>                        
                        <Row className="form-group">
                                <Col md={{size: 12}}>
                                    <Label check><strong>Rating</strong></Label>
                                </Col>
                                <Col md={{size: 12}}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}><strong>Your Name</strong></Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Author"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required | ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}><strong>Comment</strong></Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:12}}>
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Col>
                        </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
} 

function RenderDish ({dish}) {
    console.log("dish render invoked ", dish)
    if (dish != null) {
        return (
            <div>
                <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0,5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>

                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}
function RenderComment({dishComments, postComment, dishId}) {
    //console.log("dish comments invoked ",dishComments)
    console.log("post comment invoked ",postComment)
    if (dishComments != null) {
        return (
            <div >
                <Card >
                        <div className="col-md-12 m-1">
                            <h4>Comments</h4>
                        </div>
                        <Stagger in >
                            {dishComments.map((comment) => {
                            return(      
                                <Fade in>          
                                <div key={comment.id}>
                                    <div style={{border:"1px solid red"}}>
                                        <div className="row">
                                            <ul>Comment: {comment.comment}</ul>
                                            <ul>I have give: {comment.rating}</ul>
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
                                </Fade> 
                            )
                            
                        })}
                    </Stagger>
                    <CommentForm dishId={dishId} postComment={postComment}/>
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
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }

    else if (props.dish != null) {
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
                        <RenderComment dishComments={props.comments} 
                        postComment ={props.postComment}
                        dishId={props.dish.id}
                        />
                        
                    </div>
                </div>
            </div>
        )
    }
    

}

export default DishDetail;