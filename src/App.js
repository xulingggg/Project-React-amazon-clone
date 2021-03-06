import './App.css';
import Header from './Header';
import Home from './Home';
import React, { useEffect } from'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Checkout from './Checkout';
import Login from './Login'
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51HsxwEBYH6i1RLNOlUszwwHfY8V3ApXDBSV6lIudDV6Ur2tDkiztYjKYJk9CNdhfKjBBZHfJY9AdZ9JkrYDU8Uy100bOIqcAs0');
                           //this is stripe API public key

function App() {

  const [{} , dispatch] = useStateValue();

  useEffect(() => { //only run once when the app loads
    auth.onAuthStateChanged(authUser => { // a listner that will always refresh the page when auth changes. Whenever the auth changes, 
                                          // it will give us a authUser  
      console.log('This user is >>>', authUser);

      if (authUser) { //if user is/was logged in

          dispatch({
            type: 'SET_USER',
            user: authUser //set the user equal to authUser
          })

      }else {// the user is logged out
          
          dispatch({
              type:'SET_USER',
              user: null,
          })
      }

    }); 

  }, [])


  return (
    //BEM Convention
    <Router>  
      <div className="app">
      <Switch>

        <Route path='/login'> 
          <Login />
        </Route>

        <Route path='/payment'> 
          <Header />
          <Elements stripe = {promise}>
            <Payment /> 
          </Elements>
        </Route>

        <Route path='/checkout'> 
          <Header />
          <Checkout />
        </Route>

        <Route path='/'> 
          <Header />
          <Home />
        </Route>

      </Switch>
      </div>
    </Router>
  
  );
}

//!!!!!!!!!!!!Very important to make sure that the default root is at the bottom or your url will not function as intended!!!!!!!!!!!!!!!!!!!

export default App;
