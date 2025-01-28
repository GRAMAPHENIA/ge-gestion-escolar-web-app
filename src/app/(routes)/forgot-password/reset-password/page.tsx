"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordFunc } from "./action";
import { useRouter } from "next/navigation";
import { TbLoader2 } from "react-icons/tb";


const formSchema = z.object({
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
});

export default function ResetPassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true); // Set loading to true when submission starts

    try {
      const response = await resetPasswordFunc({
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        console.log("ddd: ", response);
        // Redirect to the confirmation page
        router.push("/dashboard");
      }
    } catch  {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <section className="w-[380px] bg-white p-6 rounded-lg shadow-md">
        <header>
          <h1 className="text-2xl mb-4">Password Reset</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your new password to update your password</p>
        </header>
        <article>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New password
              </label>
              <input
                {...form.register("password")}
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <input
                {...form.register("passwordConfirm")}
                type="password"
                id="passwordConfirm"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {form.formState.errors.passwordConfirm && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.passwordConfirm.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="text-red-500 text-sm mt-2">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-blue-500 disabled:bg-gray-400"
            >
              {isLoading ? (
                <>
                  <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
