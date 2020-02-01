import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
// import {DISHES} from "../shared/dishes"; we store states at redux store
// import {COMMENTS} from '../shared/comments';
// import {PROMOTIONS} from '../shared/promotions';
// import {LEADERS} from '../shared/leaders'; 
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';


const mapStateToProps = state =>{
    return {
      dishes: state.dishes, //these are now available as props
      comments: state.comments,// so we use props below
      promotions: state.promotions,
      leaders: state.leaders,
       
    }
    
}
 //addComment as an action is called and dispatched
 //to be used as a function by dispatch()
 //so addComment can be used as a props
const mapDispatchToProps =(dispatch) => 
({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))}
  
})




class Main extends Component {
  

  componentDidMount () {
    this.props.fetchDishes();
    //console.log('didmount:', this.props.dispatch)
  }


  render() {
    console.log('dish: ', this.props.dishes)
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess} 
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[3]}        
        /> 
      );
    }
    
    const DishWithId = ({match}) => { /*Route pass 3 props match, location, history */
      //console.log("DishWithId invoked", {match})
      
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) =>dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.dishesLoading}
        ErrMess={this.props.dishes.errMess}
        comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        //to make use te addComment
        addComment ={this.props.addComment}
        />
        )
    }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component ={HomePage} />
          <Route exact path="/menu" component ={() => <Menu dishes={this.props.dishes} />} /> {/* necessary to pass props */}
          <Route path="/menu/:dishId" component={DishWithId}></Route>
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Redirect to="home" />
        </Switch>
        <Footer />
      </div>

      
    );
  }
}

//to make props available, we use connect 
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Main))); //to connect component to Redux Store
