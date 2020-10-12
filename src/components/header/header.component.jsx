import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {auth} from '../../firebase/firebase.utils'
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component'
import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector'
const Header= ({currentUser,hidden})=>(
    <div className="header">
        <Link className='logo-container' to="">
            <Logo className='logo' />
        </Link>
    <div className='options'>
        <Link className='option' to='/shop'>SHOP</Link>
        <Link className='option' to='/contact'>CONTACT</Link>
        {
            currentUser ? (
                <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
            ) :(
                <Link className='option' to='/signin'>
                    SIGN IN        
                </Link>
            )
        }
       <CartIcon/>
       
    </div>
    {
        hidden? null:<CartDropdown/> 
    }
    </div>
)


//state is high order state-->root Reducer 
//taking value from state and passing as a prop to header componenent
//see below description for createStructuredSelector
const mapStateToProps = createStructuredSelector ({
    //state is root reducer inside root-reducer we will find user key and associated currUser from that key
    currentUser: selectCurrentUser,
    hidden:selectCartHidden
});

//this is same like above but to reduce the code, we have written createStructuredSelector
//this will take out the higher order props
// const mapStateToProps = state => ({
//     currentUser: selectCurrentUser(state),
//     hidden:selectCartHidden(state)
// });


export default connect(mapStateToProps)(Header);