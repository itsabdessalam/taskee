import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import {useForm} from "../hooks";
import {useState} from "react";
import until from "../utils/until";
import AuthService from "../services/AuthService";
import {handleLogin, isLoggedIn} from "../utils/auth";
import {Redirect} from "react-router-dom";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async () => {
    setIsLoading(true);
    setError(null);

    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    };

    const [err, result] = await until(AuthService.register(user));

    if (err) {
      setError({message: err.message});
      setIsLoading(false);
    }

    if (result && result.data.errors) {
      setError({message: "Invalid credentials provided"});
      setIsLoading(false);
    }

    const {data = {}} = result || {};

    if (data && data.auth && data.token) {
      handleLogin({
        ...user,
        token: data.token
      });
      setIsLoading(false);
    }
  };

  const {values, handleChange, handleSubmit} = useForm(register, {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  if (isLoggedIn()) return <Redirect to="/"/>;

  return (
   <>
     <Title level={2}>Register</Title>
     <Form className="inner-form" onSubmit={handleSubmit}>
       <Input
        name="firstname"
        type="text"
        placeholder={"doe"}
        label={"First Name"}
        onChange={handleChange}
        value={values.firstname}
        required
       />
       <Input
        name="lastname"
        type="text"
        placeholder={"john"}
        label={"Last Name"}
        onChange={handleChange}
        value={values.lastname}
        required
       />
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
         {isLoading ? "Loading" : "Register"}
       </Button>
     </Form>
   </>
  );
};

export default RegisterForm;