import React from "react";

function useShowPassword(): [boolean, () => void] {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = React.useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  return [showPassword, handleTogglePassword];
}

export default useShowPassword;
