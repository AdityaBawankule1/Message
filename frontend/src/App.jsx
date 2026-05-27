import { useState } from "react";
import logo from "./assets/she-YlenJon1O7ieeEoa.avif";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Your name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "A valid email is required";
    if (!form.message.trim() || form.message.length < 20)
      e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);

    try {
      const response = await fetch("http://[::1]:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim()
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrors({ server: result.message || "The database rejected this entry." });
      }
    } catch (error) {
      console.error("Network connectivity issue:", error);
      setErrors({ server: "Unable to reach your backend server. Is it running?" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    // Clears error state cleanly when typing resumes
    setErrors((e) => ({ ...e, [field]: undefined, server: undefined }));
  };

  if (submitted) {
    return (
      <div className="text-center flex flex-col items-center gap-5 py-8 antialiased">
        <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100">
          <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
            <path d="M14 24l7 7 13-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1a2340] tracking-tight">Message received</h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-[34ch]">
          Thank you, <strong className="font-semibold text-slate-700">{form.name.split(" ")[0]}</strong>. We'll be in touch
          at <em className="not-italic font-medium text-slate-600">{form.email}</em> within 2–3 business days.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
          className="mt-2 border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full block px-4 py-3.5 rounded-xl border text-sm text-[#1a2340] outline-none transition-all duration-200 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-orange-400 ${
      errors[field]
        ? "border-red-300 bg-red-50/30 focus:ring-red-50 focus:border-red-500"
        : "border-slate-200 hover:border-slate-300"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col gap-6 m-0 p-0 box-border antialiased">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 text-left">Name</label>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          autoComplete="name"
          onChange={(e) => handleChange("name", e.target.value)}
          className={inputClass("name")}
        />
        {errors.name && <span className="text-xs font-medium text-red-500 mt-1.5 block text-left">{errors.name}</span>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 text-left">Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={form.email}
          autoComplete="email"
          onChange={(e) => handleChange("email", e.target.value)}
          className={inputClass("email")}
        />
        {errors.email && <span className="text-xs font-medium text-red-500 mt-1.5 block text-left">{errors.email}</span>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 text-left">Message</label>
        <textarea
          rows={5}
          maxLength={1000}
          placeholder="How can we help?"
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`${inputClass("message")} resize-y min-h-[120px] max-h-[320px]`}
        />
        {errors.message && <span className="text-xs font-medium text-red-500 mt-1.5 block text-left">{errors.message}</span>}
      </div>

      {/* NEW: Global Server Error Alert Box Container */}
      {errors.server && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3.5 text-xs font-medium text-left flex items-start gap-2.5 animate-shake">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errors.server}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`group w-full py-3.5 rounded-xl text-white font-semibold text-[0.95rem] tracking-wide transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2 border-none mt-2 shadow-md`}
        style={{
          background: loading
            ? "#fdba74"
            : "linear-gradient(to right, #f97c3c, #f95a3c)"
        }}
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export default function App() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-[#faf5f0] to-[#f5ebe0] font-sans flex flex-col justify-start items-center py-20 px-4 box-border antialiased text-slate-800">
      <div className="w-full max-w-[480px] flex flex-col items-center box-border">

        {/* HEADER */}
        <div className="text-center mb-10 w-full flex flex-col items-center">
          <img
            src={logo}
            alt="She Can Foundation"
            className="w-20 h-20 rounded-2xl object-cover mb-6 border border-orange-100 shadow-md shadow-orange-100/50"
          />
          <h1 className="text-3xl font-extrabold text-[#1a2340] tracking-tight leading-tight mb-3 text-center">
            She Can Foundation
          </h1>
          <p className="text-[0.95rem] text-slate-500 leading-relaxed max-w-[38ch] text-center mx-auto font-normal">
            Empowering women through education, opportunity, and community.
            We'd love to hear from you.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(244,190,140,0.15)] border border-orange-100/40 w-full px-8 py-10 mb-8 box-border block text-left">
          <h2 className="text-xl font-bold text-[#1a2340] tracking-tight mb-1 text-left">Get in touch</h2>
          <p className="text-sm text-slate-400 mb-8 text-left font-normal">Fill out the form below and we'll get back to you soon.</p>
          <ContactForm />
        </div>

        {/* FOOTER */}
        <p className="text-xs font-medium text-slate-400 text-center w-full mt-2">
          © 2026 She Can Foundation ·{" "}
          <a href="#" className="text-orange-500 hover:text-orange-600 hover:underline transition-colors">Privacy Policy</a>
          {" "}·{" "}
          <a href="#" className="text-orange-500 hover:text-orange-600 hover:underline transition-colors">Terms</a>
        </p>

      </div>
    </div>
  );
}