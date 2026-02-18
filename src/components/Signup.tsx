import { useRef, useState } from "react";
import api from "../api/axiosInstance";
import { Input } from "./Input";
import { Button } from "./Button";
import { ButtonVariant, ButtonSize } from "../types/button";
import { AuthButtonBody } from "../ui/auth/AuthButtonBody";
import { InputWrapper } from "../ui/auth/InputWrapper";
import { InputLabel } from "./InputLabel";
import { z } from "zod";
import { ErrorText } from "../ui/auth/ErrorText";

import { toast } from "react-toastify";

interface SignUpProps {
  setAuthMode: (authMode: string) => void;
}
export const Signup = ({ setAuthMode }: SignUpProps) => {
  const emailRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

  const usernameRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const passwordRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

  const confirmPasswordRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signup = async () => {
    setNameError("");
    setPasswordError("");
    if (
      usernameRef.current === null ||
      (usernameRef.current.value.trim() === "" &&
        passwordRef.current === null) ||
      passwordRef.current.value.trim() === ""
    ) {
      toast.error("Input fields are empty");
      return;
    }
    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    console.log({ email, username, password, confirmPassword });
    if (password.trim() !== confirmPassword?.trim()) {
      toast.error("Passwords do not match");
      return;
    }

    const userSchema = z
      .object({
        email: z.string().email("Invalid email address"),
        username: z.string().min(3, "username is too small"),
        password: z
          .string()
          .min(8)
          .regex(/[A-Z]/, "Password must contain an uppercase letter")
          .regex(/[a-z]/, "Password must contain a lowercase letter"),

        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

    type userDataType = z.infer<typeof userSchema>;
    const userData: userDataType = {
      email,
      username,
      password,
      confirmPassword,
    };

    const parsedData = userSchema.safeParse(userData);
    if (!parsedData.success) {
      parsedData.error.issues.forEach((issue) => {
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
      const response = await api.post(`/api/v1/auth/signup`, userData);

      console.log(response);
      if (response.status === 201) {
        toast.warning(response.data.message);
      }
      if (response.status === 401 || response.status === 403) {
        toast.error(response.data.message);
      }
      setAuthMode("Signin");
    } catch {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <InputWrapper>
        <InputLabel htmlfor="email" labelText="Email" />
        <Input
          id="email"
          width="w-80"
          reference={emailRef}
          type={"text"}
          placeholder="email"
        />
        {nameError !== "" && <ErrorText message={nameError} />}
      </InputWrapper>
      <InputWrapper>
        <InputLabel htmlfor="username" labelText="Enter your username" />
        <Input
          width="w-80"
          reference={usernameRef}
          type={"text"}
          placeholder="username"
        />
        {nameError !== "" && <ErrorText message={nameError} />}
      </InputWrapper>

      <InputWrapper>
        <InputLabel htmlfor="password" labelText="Enter your password" />
        <Input
          width="w-80"
          reference={passwordRef}
          type={"password"}
          placeholder="password"
        />
        {passwordError !== "" && <ErrorText message={passwordError} />}
      </InputWrapper>

      <InputWrapper>
        <InputLabel
          htmlfor="confirmPassword"
          labelText="Confirm your password"
        />
        <Input
          width="w-80"
          reference={confirmPasswordRef}
          type={"password"}
          placeholder="confirm password"
        ></Input>
      </InputWrapper>

      {/* {signupError !=="" && <ErrorText message={signupError} />} */}
      <AuthButtonBody>
        <Button
          onClick={signup}
          variant={ButtonVariant.Primary}
          text="Signup"
          size={ButtonSize.Medium}
          fullWidth={false}
          loading={false}
          type="submit"
        />
      </AuthButtonBody>
    </>
  );
};
