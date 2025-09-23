import {   useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { z } from "zod";
import { Button } from "./Button";
import { InputLabel } from "./InputLabel";
import { InputWrapper } from "../ui/auth/InputWrapper";
import { ErrorText } from "../ui/auth/ErrorText";
import { AuthButtonBody } from "../ui/auth/AuthButtonBody";

import { toast } from "react-toastify";

export const Signin = () => {
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");


 

  const usernameRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const passwordRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const signin = async () => {
       setNameError("");
       setPasswordError("");

    if(usernameRef.current === null || usernameRef.current.value.trim() === "" || passwordRef.current === null || passwordRef.current.value.trim() === "") { 
      toast.error("Input fields are empty");
      return;
    }
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const userSchema = z.object({
      username: z.string().min(3, "*Username is too small"),
      password: z.string().min(8)
        .regex(/[A-Z]/, "*Password must contain an uppercase letter")
        .regex(/[a-z]/, "*Password must contain a lowercase letter"),
    });

    type userDataType = z.infer<typeof userSchema>;

    const userData: userDataType = {
      username,
      password
    };

    const parsedData = userSchema.safeParse(userData);
   
  
    if (!parsedData.success) {
      parsedData.error.issues.forEach(issue => {
        if (issue.path[0] === "username") {
          setNameError(issue.message);
         
        }
        if (issue.path[0] === "password") {
          setPasswordError(issue.message);
        }
      });
      return;
    }

    

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, userData);

      const authToken = response.data.token;
      if(response.status === 401 || response.status === 403) {
        toast.error(response.data.message);
      }
      document.cookie = `token=${authToken}; max-age=86400`; 
      navigate("/dashboard");
      toast.success("Signin successful!");
    } catch {
      toast.error("Invalid credentials");
     
     
    }
  };

  return (
    <>
      <InputWrapper>
        <InputLabel htmlfor="username" labelText="Enter your username" />
        <Input id="username" width="w-80" reference={usernameRef} type="text" placeholder="username"  required/>
        {nameError !== "" && <ErrorText message={nameError} />}
      </InputWrapper>

      <InputWrapper>
        <InputLabel htmlfor="password" labelText="Enter your password" />
        <Input id="password" width="w-80" reference={passwordRef} type="password" placeholder="password"  required/>
        {passwordError !== "" && <ErrorText message={passwordError} />}
      </InputWrapper>

      <AuthButtonBody>
        <Button
          onClick={signin}
          variant="primary"
          text="Signin"
          size="md"
          fullWidth={false}
          loading={false}
        />
      </AuthButtonBody>
    </>
  );
};
