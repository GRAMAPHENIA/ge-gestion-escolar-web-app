"use client";

import { passwordSchema } from "@/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { loginUser } from "./action";
import Link from "next/link";
import GoogleSignin from "./GoogleSignin";
import { LuLoaderPinwheel } from "react-icons/lu";

// Schema de validación con Zod
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
});

// Inferimos los tipos del esquema para React Hook Form
type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { register, handleSubmit, formState, getValues } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        setServerError(response.message || "Login failed");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const email = getValues("email");

  return (
    <main className="flex justify-center items-center min-h-screen">
      <section className="w-[380px]">
        <header>
          <title>Login</title>
          <p>Login to your account</p>
        </header>
        <article>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {serverError && (
              <p className="text-red-500 text-sm mt-2">{serverError}</p>
            )}
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LuLoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </button>
            <GoogleSignin />
          </form>
        </article>
        <footer className="flex flex-col gap-2 mt-4">
          <div className="text-muted-foreground text-sm">
            No tenes una cuenta?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
          <div className="text-muted-foreground text-sm">
            Forgot password?{" "}
            <Link
              href={`/forgot-password${
                email ? `?email=${encodeURIComponent(email)}` : ""
              }`}
              className="underline"
            >
              Reset my password
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
