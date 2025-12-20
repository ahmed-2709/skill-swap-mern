import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Sign";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

    const switchAuthMode = () => {
        setIsLogin(prev => !prev);   // toggle
    };

    return isLogin ? (
        <Login onSwitch={switchAuthMode} />
    ) : (
        <Signup onSwitch={switchAuthMode} />
    );
};

export default Auth;
