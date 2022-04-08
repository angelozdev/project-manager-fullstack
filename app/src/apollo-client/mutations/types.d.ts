type LoginData = {
  logIn: {
    accessToken: string;
  };
};

type LoginVars = {
  data: {
    email: string;
    password: string;
  };
};

type SignUpData = {
  SignUp: {
    name: string;
  };
};

type SignUpVars = {
  data: {
    name: string;
    email: string;
    password: string;
  };
};
