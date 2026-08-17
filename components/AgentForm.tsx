"use client";

import { useEffect, useState } from "react";
import {
  submitAgentApplication,
  type AgentApplicationData,
} from "@/actions/agent";

type AgentFormProps = {
  onSuccess?: () => void;
};

export default function AgentForm({ onSuccess }: AgentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      event.target.value = "";
      return;
    }

    // Maximum 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB.");
      event.target.value = "";
      return;
    }

    setImage(file);

    // Remove previous preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const data: AgentApplicationData = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        description: String(
          formData.get("description") || ""
        ),
        facebook: String(
          formData.get("facebook") || ""
        ),
        twitter: String(
          formData.get("twitter") || ""
        ),
        linkedin: String(
          formData.get("linkedin") || ""
        ),
        instagram: String(
          formData.get("instagram") || ""
        ),

        // Important: pass File to Server Action
        image,
      };

      const result = await submitAgentApplication(data);

      if (result.applyAsAgent.success) {
        setSuccessMessage(
          "Your application has been submitted successfully."
        );

        form.reset();

        setImage(null);
        setImagePreview(null);

        setTimeout(() => {
          onSuccess?.();
        }, 2000);

        return;
      }

      alert(result.applyAsAgent.message);
    } catch (error) {
      console.error(
        "Agent application error:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="agent-application-form"
      onSubmit={handleSubmit}
    >
      <div className="row">

        {/* Success Message */}
        {successMessage && (
          <div className="col-12 mb-4">
            <div className="alert alert-success text-center">
              {successMessage}
            </div>
          </div>
        )}

        {/* Agent Image */}
        <div className="col-12 mb-4">
          <label
            htmlFor="agentImage"
            className="form-label"
          >
            Agent Image
          </label>

          <input
            type="file"
            id="agentImage"
            name="agentImage"
            className="form-control"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Agent preview"
                width={120}
                height={120}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
        </div>

        {/* Name */}
        <div className="col-md-6 mb-3">
          <label
            htmlFor="name"
            className="form-label"
          >
            Name *
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div className="col-md-6 mb-3">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email *
          </label>

          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Phone */}
        <div className="col-md-6 mb-3">
          <label
            htmlFor="phone"
            className="form-label"
          >
            Phone
          </label>

          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Description */}
        <div className="col-12 mb-3">
          <label
            htmlFor="description"
            className="form-label"
          >
            About You
          </label>

          <textarea
            id="description"
            name="description"
            className="form-control"
            rows={4}
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Facebook */}
        <div className="col-md-6 mb-3">
          <label
            htmlFor="facebook"
            className="form-label"
          >
            Facebook URL
          </label>

          <input
            type="url"
            id="facebook"
            name="facebook"
            className="form-control"
            placeholder="https://facebook.com/..."
          />
        </div>

        {/* Twitter */}
        <div className="col-md-6 mb-3">
          <label
            htmlFor="twitter"
            className="form-label"
          >
            Twitter / X URL
          </label>

          <input
            type="url"
            id="twitter"
            name="twitter"
            className="form-control"
            placeholder="https://x.com/..."
          />
        </div>

        {/* LinkedIn */}
        <div className="col-md-6 mb-3">
          <label
            htmlFor="linkedin"
            className="form-label"
          >
            LinkedIn URL
          </label>

          <input
            type="url"
            id="linkedin"
            name="linkedin"
            className="form-control"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        {/* Instagram */}
        <div className="col-md-6 mb-3">
          <label
            htmlFor="instagram"
            className="form-label"
          >
            Instagram URL
          </label>

          <input
            type="url"
            id="instagram"
            name="instagram"
            className="form-control"
            placeholder="https://instagram.com/..."
          />
        </div>

        {/* Submit */}
        <div className="col-12 text-center mt-3">
          <button
            type="submit"
            className="btn btn-primary text-white py-3 px-4"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Application"}
          </button>
        </div>

      </div>
    </form>
  );
}