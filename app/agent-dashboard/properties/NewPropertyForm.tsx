"use client";

import type { LoggedInUser } from "@/lib/auth";
import { useState, type FormEvent } from "react";
import {
  submitProperty,
  type PropertyApplicationData,
} from "@/actions/property";

type NewPropertyFormProps = {
  user: LoggedInUser;
};

export default function NewPropertyForm({
  user,
}: NewPropertyFormProps) {
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;

    setIsSubmitting(true);
    setMessage("");

    try {
      const formData = new FormData(form);

      const propertyData: PropertyApplicationData = {
        title: String(
          formData.get("title") || ""
        ),

        content: String(
          formData.get("content") || ""
        ),

        price: String(
          formData.get("price") || ""
        ),

        area: String(
          formData.get("area") || ""
        ),

        bedroom: String(
          formData.get("bedroom") || ""
        ),

        bathroom: String(
          formData.get("bathroom") || ""
        ),

        mapEmbed: String(
          formData.get("mapEmbed") || ""
        ),

        featuredImage:
          formData.get("featuredImage") instanceof File
            ? (formData.get(
                "featuredImage"
              ) as File)
            : null,
      };

      const result =
        await submitProperty(propertyData);

      if (
        result.submitPropertyForReview
          .success
      ) {
        setMessage(
          result.submitPropertyForReview.message
        );

        form.reset();

        return;
      }

      setMessage(
        result.submitPropertyForReview.message
      );
    } catch (error) {
      console.error(
        "Property application error:",
        error
      );

      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="section">
      <div className="container">

        <div className="mb-5">
          <h1>Add New Property</h1>

          <p className="text-muted">
            Welcome, {user.name}. Submit your
            property for review.
          </p>
        </div>

        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Your existing property fields */}

          <div className="mb-4">
            <label
              htmlFor="title"
              className="form-label"
            >
              Property Title *
            </label>

            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              required
            />
          </div>

            <div className="mb-4">
            <label
              htmlFor="content"
              className="form-label"
            >
              Property Description *
            </label>

            <textarea
              id="content"
              name="content"
              className="form-control"
              rows={5}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="form-label"
            >
              Price *
            </label>

            <input
              type="text"
              id="price"
              name="price"
              className="form-control"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="area"
              className="form-label"
            >
              Area (sq ft) *
            </label>

            <input
              type="text"
              id="area"
              name="area"
              className="form-control"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="bedroom"
              className="form-label"
            >
              Bedrooms *
            </label>

            <input
              type="number"
              id="bedroom"
              name="bedroom"
              className="form-control"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="bathroom"
              className="form-label"
            >
              Bathrooms *
            </label>

            <input
              type="number"
              id="bathroom"
              name="bathroom"
              className="form-control"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mapEmbed"
              className="form-label"
            >
              Map Embed Code
            </label>

            <textarea
              id="mapEmbed"
              name="mapEmbed"
              className="form-control"
              rows={3}
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="featuredImage"
              className="form-label"
            >
              Featured Image
            </label>

            <input
              type="file"
              id="featuredImage"
              name="featuredImage"
              className="form-control"
              accept="image/*"
            />
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Property"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}