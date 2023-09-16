import { useState, useEffect } from 'react';

export const useUserAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookie = require("js-cookie");
    const username = cookie.get("user-name");
    
    setIsLoggedIn(!!username);
  }, []);

  return isLoggedIn;
}


