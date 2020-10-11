import React from 'react';
 import './custom-button.styles.scss'


 //isGoogleSignIn=>> if this is true classname->google-sign-in else null
 const CustomButton =({children, isGoogleSignIn,inverted, ...otherProps})=>(
    <button className={`${inverted? 'inverted': ''}
                    ${isGoogleSignIn? 'google-sign-in': ''} custom-button`}
                      {...otherProps}
    >
        {children}
    </button>
 )

 export default CustomButton;