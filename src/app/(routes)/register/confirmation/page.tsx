import { CiMail } from "react-icons/ci";

export default function RegistrationConfirmation() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="w-[540px] text-center">
        <header>
          <title className="text-2xl font-bold">Check Your Email</title>
        </header>
        <article className="mt-6">
          <div className="flex justify-center mb-6">
            <CiMail className="h-16 w-16 text-blue-500" />
          </div>
          <p className="text-gray-600 mb-4">
            Weve sent a confirmation link to your email address. Please check
            your inbox and click the link to activate your account.
          </p>
          <p className="text-sm text-gray-500">
            If you dont see the email, please check your spam folder.
          </p>
        </article>
      </section>
    </main>
  );
}
