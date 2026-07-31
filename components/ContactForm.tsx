"use client";

import { useState, FormEvent, ChangeEvent } from "react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email))
      return "Please enter a valid email address.";

    if (!formData.subject.trim()) return "Please enter a subject.";

    if (!formData.message.trim()) return "Please enter your message.";

    if (formData.message.length < 10)
      return "Message should be at least 10 characters.";

    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccess("Thank you! Your message has been sent successfully.");
      setFormData(initialForm);
    } catch (err: any) {
      setError(err.message || "Unable to send your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 mb-3">
          <input
            type="text"
            name="subject"
            className="form-control"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 mb-3">
          <textarea
            name="message"
            rows={7}
            className="form-control"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        {error && (
          <div className="col-12 mb-3">
            <div className="alert alert-danger">{error}</div>
          </div>
        )}

        {success && (
          <div className="col-12 mb-3">
            <div className="alert alert-success">{success}</div>
          </div>
        )}

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </form>
  );
}