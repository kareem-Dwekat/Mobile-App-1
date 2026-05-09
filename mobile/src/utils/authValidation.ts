import { LoginErrors, SignupErrors } from "../types/auth";

export const validateForgotPasswordEmail = (email: string) => {
  if (!email.trim()) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return "Invalid email";

  return "";
};

export const validateSignupForm = ({
  fullName,
  email,
  password,
  confirmPassword,
}: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const errors: SignupErrors = {};

  if (!fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = "Invalid email";
    }
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Minimum 8 characters";
  } else if (!/(?=.*[A-Z])/.test(password)) {
    errors.password = "Must include at least 1 uppercase letter";
  } else if (!/(?=.*\d)/.test(password)) {
    errors.password = "Must include at least 1 number";
  } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
    errors.password = "Must include at least 1 special character";
  }

  if (!confirmPassword.trim()) {
    errors.confirmPassword = "Confirm your password";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateLoginForm = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const errors: LoginErrors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = "Invalid email";
    }
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Minimum 8 characters";
  }

  return errors;
};