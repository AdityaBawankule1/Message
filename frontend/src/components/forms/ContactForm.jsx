import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { contactSchema } from "../../validation/contactSchema";

function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: validationErrors }
  } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 px-4 bg-green-100 border border-green-400 rounded-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-2">✓ Form Submitted Successfully!</h2>
        <p className="text-green-600">Thank you for reaching out to She Can Foundation.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <input
          {...register("name")}
          placeholder="Full Name"
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-purple-700"
        />
        {validationErrors.name && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-purple-700"
        />
        {validationErrors.email && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder="Message"
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:border-purple-700 min-h-[120px]"
        />
        {validationErrors.message && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default ContactForm;