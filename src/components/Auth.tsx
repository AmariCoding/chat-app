import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";

const AuthType = {
  Login: "login",
  SignUp: "signup",
} as const;

interface AuthFormData {
  email: string;
  password: string;
}

const Auth = () => {
  const [authType, setAuthType] = useState<
    (typeof AuthType)[keyof typeof AuthType]
  >(AuthType.Login);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>();

  const onSubmit = async (data: AuthFormData) => {
    setAuthError(null);

    if (authType === AuthType.Login) {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) setAuthError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (error) {
        setAuthError(error.message);
      } else {
        alert(
          "Account created successfully! Please check your email for confirmation."
        );
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>{authType === AuthType.Login ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email is required." })}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long.",
            },
          })}
        />
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}

        {authError && <p className="error-text">{authError}</p>}

        <button type="submit">
          {authType === AuthType.Login ? "Login" : "Sign Up"}
        </button>
      </form>

      <div>
        {authType === AuthType.Login ? (
          <p>
            Don't have an account?{" "}
            <button onClick={() => setAuthType(AuthType.SignUp)}>
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button onClick={() => setAuthType(AuthType.Login)}>Login</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
