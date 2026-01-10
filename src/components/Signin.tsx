import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { z } from "zod";
import { Button } from "./Button";
import { ButtonVariant, ButtonSize } from "../types/button";
import { InputLabel } from "./InputLabel";
import { InputWrapper } from "../ui/auth/InputWrapper";
import { ErrorText } from "../ui/auth/ErrorText";
import { AuthButtonBody } from "../ui/auth/AuthButtonBody";

import { toast } from "react-toastify";

export const Signin = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const passwordRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const navigate = useNavigate();

  const signin = async () => {
    setEmailError("");
    setPasswordError("");

    if (
      emailRef.current === null ||
      emailRef.current.value.trim() === "" ||
      passwordRef.current === null ||
      passwordRef.current.value.trim() === ""
    ) {
      toast.error("Input fields are empty");
      return;
    }
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const userSchema = z.object({
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8)
        .regex(/[A-Z]/, "*Password must contain an uppercase letter")
        .regex(/[a-z]/, "*Password must contain a lowercase letter"),
    });

    type userDataType = z.infer<typeof userSchema>;

    const userData: userDataType = {
      email,
      password,
    };

    const parsedData = userSchema.safeParse(userData);

    if (!parsedData.success) {
      parsedData.error.issues.forEach((issue) => {
        if (issue.path[0] === "email") {
          setEmailError(issue.message);
        }
        if (issue.path[0] === "password") {
          setPasswordError(issue.message);
        }
      });
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/signin`,
        userData,
        {
          withCredentials: true,
        },
      );

      localStorage.setItem("username", response.data.userDetails.username);
      localStorage.setItem(
        "dateOfJoined",
        response.data.userDetails.dateOfJoined,
      );
      localStorage.setItem(
        "isShareEnabled",
        JSON.stringify(response.data.userDetails.isShareEnabled),
      );
      navigate("/dashboard");
      toast.success("Signin successful!");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <InputWrapper>
        <InputLabel htmlfor="email" labelText="Enter your email" />
        <Input
          id="email"
          width="w-80"
          reference={emailRef}
          type="text"
          placeholder="email"
          required
        />
        {emailError !== "" && <ErrorText message={emailError} />}
      </InputWrapper>

      <InputWrapper>
        <InputLabel htmlfor="password" labelText="Enter your password" />
        <Input
          id="password"
          width="w-80"
          reference={passwordRef}
          type="password"
          placeholder="password"
          required
        />
        {passwordError !== "" && <ErrorText message={passwordError} />}
      </InputWrapper>

      <AuthButtonBody>
<Button
          onClick={signin}
          variant={ButtonVariant.Primary}
          text="Signin"
          size={ButtonSize.Medium}
          fullWidth={false}
          loading={false}
          type="submit"
        />
      </AuthButtonBody>
    </>
  );
};
