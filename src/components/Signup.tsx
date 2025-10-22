
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Input } from "./Input";
import { Button } from "./Button";
import {ButtonVariant, ButtonSize} from "../types/button"
import { AuthButtonBody } from "../ui/auth/AuthButtonBody";
import { InputWrapper } from "../ui/auth/InputWrapper";
import { InputLabel } from "./InputLabel";
import { z } from "zod";
import { ErrorText } from "../ui/auth/ErrorText";

import { toast } from "react-toastify";


interface SignUpProps {

  setAuthMode: (authMode: string) => void;
}
export const Signup = ({setAuthMode}: SignUpProps) => {



  const usernameRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const passwordRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
 

  const signup = async () => {

    setNameError("");
    setPasswordError("");
   if(usernameRef.current === null || usernameRef.current.value.trim() === "" &&  passwordRef.current === null || passwordRef.current.value.trim() === "") { 
      toast.error("Input fields are empty");
      return;
    }

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
        
    const userSchema = z.object({
      username: z.string().min(3, "username is too small"),
      password: z.string().min(8)
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[a-z]/, "Password must contain a lowercase letter"),
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

    setNameError("");
    setPasswordError("");
   

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, userData);
      if(response.status === 201) {
        toast.warning(response.data.message);
      }
      if (response.status === 401 || response.status === 403) {
        toast.error(response.data.message);
      }
      setAuthMode("Signin");

    } catch  {
    
      toast.error("Signup failed. Please try again.");

    }
  };    

  return (
    <>
      <InputWrapper>
        <InputLabel  htmlfor="username" labelText="Enter your username" />
        <Input width="w-80" reference={usernameRef} type={"text"} placeholder="username" />
        {nameError !== "" && <ErrorText message={nameError} />}
      </InputWrapper>

      <InputWrapper>
        <InputLabel htmlfor="password" labelText="Enter your password" />
        <Input width="w-80" reference={passwordRef} type={"password"} placeholder="password" />
        {passwordError !== "" && <ErrorText message={passwordError} />}
      </InputWrapper>
      {/* {signupError !=="" && <ErrorText message={signupError} />} */}
      <AuthButtonBody>
        <Button onClick={signup} variant={ButtonVariant.Primary} text="Signup" size={ButtonSize.Medium} fullWidth={false} loading={false} />
      </AuthButtonBody>
    </>
  );
};
