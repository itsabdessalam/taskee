import {useState} from "react";
import {Redirect} from "react-router-dom";
import {useForm} from "../hooks";
import until from "../utils/until";

import {handleLogin, isLoggedIn} from "../utils/auth";
import AuthService from "../services/AuthService";

import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import Title from "./Title";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = async () => {
    setIsLoading(true);
    setError(null);

    const user = {
      email: values.email,
      password: values.password
    };

    const [err, result] = await until(AuthService.login(user));

    if (err) {
      setError({message: err.message});
      setIsLoading(false);
    }

    if (result && result.data.errors) {
      setError({message: "Invalid credentials provided"});
      setIsLoading(false);
    }

    const {data = {}} = result.data || {};

    if (data && data.user && data.token) {
      handleLogin({
        ...data.user,
        token: data.token
      });
      setIsLoading(false);
    }
  };

  const {values, handleChange, handleSubmit} = useForm(auth, {
    email: "",
    password: ""
  });

  if (isLoggedIn()) {
    return <Redirect to="/"/>;
  }

  return (
   <>
     <Title level={2}>Login</Title>
     <Form className="inner-form" onSubmit={handleSubmit}>
       <Input
        name="email"
        type="text"
        placeholder={"john.doe@email.com"}
        label={"Email"}
        onChange={handleChange}
        value={values.email}
        required
       />
       <Input
        name="password"
        type="password"
        placeholder={"••••••••••"}
        label={"Password"}
        onChange={handleChange}
        value={values.password}
        required
       />
       {error ? <p className="error">{error.message}</p> : null}
       <Button type="submit" disabled={isLoading}>
         {isLoading ? "Loading" : "Login"}
       </Button>
     </Form>
   </>
  );
};

export default LoginForm;
