import React from "react";
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from 'react-router-dom';
//to fetch image from server
import { baseUrl } from '../shared/baseUrl'; 
import {Loading} from './LoadingComponent';

    function RenderMenuItem({dish }) {
        //we no longer take images from local,
        //we take them from server, so no need to store them
        return (

            <Card>
                <Link to={`/menu/${dish.id}`} >
                    <CardImg width="100%" src={baseUrl + dish.image}  alt={dish.name}/>
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
            
        )
        
    } 

    const Menu = (props) => {
        console.log("menu props", props)
        const menu = props.dishes.dishes.map((dish) => {
            //console.log("menu invoked", dish)
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish}/>
                </div>
            );
        });

        if (props.dishes.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.dishes.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
            );
        }
        
        else 
            return (
                
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
    }
        

export default Menu;