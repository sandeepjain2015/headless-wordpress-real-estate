"use server";

import { fetchGraphQL } from "@/lib/wordpress";
import { APPLY_AS_AGENT_MUTATION } from "@/graphql/agent";

export type AgentApplicationData = {
  name: string;
  email: string;
  phone: string;
  description: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  image: File | null;
  turnstileToken: string;
};

export type AgentApplicationResponse = {
  applyAsAgent: {
    success: boolean;
    message: string;
  };
};

/**
 * Verify Cloudflare Turnstile token.
 */
async function verifyTurnstile(
  token: string
): Promise<boolean> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error(
      "TURNSTILE_SECRET_KEY is not defined."
    );

    throw new Error(
      "Turnstile secret key is not configured."
    );
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          secret,
          response: token,
        }),

        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Turnstile API error:",
        response.status,
        response.statusText
      );

      return false;
    }

    const result = await response.json();

    console.log(
      "Turnstile verification:",
      result
    );

    return result.success === true;

  } catch (error) {
    console.error(
      "Turnstile verification error:",
      error
    );

    return false;
  }
}

/**
 * Upload image to WordPress Media Library.
 */
async function uploadAgentImage(
  image: File
): Promise<number> {

  const WP_SITE_URL =
    process.env.WP_SITE_URL;

  if (!WP_SITE_URL) {
    throw new Error(
      "WP_SITE_URL is not defined."
    );
  }

  const WP_MEDIA_AUTH =
    process.env.WP_MEDIA_AUTH;

  if (!WP_MEDIA_AUTH) {
    throw new Error(
      "WP_MEDIA_AUTH is not defined."
    );
  }

  const imageBuffer = Buffer.from(
    await image.arrayBuffer()
  );

  const response = await fetch(
    `${WP_SITE_URL}/wp-json/wp/v2/media`,
    {
      method: "POST",

      headers: {
        Authorization:
          `Basic ${WP_MEDIA_AUTH}`,

        "Content-Disposition":
          `attachment; filename="${image.name}"`,

        "Content-Type": image.type,
      },

      body: imageBuffer,
    }
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "WordPress Media Upload Error:",
      errorText
    );

    throw new Error(
      "Failed to upload agent image."
    );
  }

  const media =
    await response.json();

  if (!media.id) {
    throw new Error(
      "WordPress did not return a media ID."
    );
  }

  return Number(media.id);
}

/**
 * Submit Agent Application.
 */
export async function submitAgentApplication(
  input: AgentApplicationData
): Promise<AgentApplicationResponse> {

  /**
   * ----------------------------------------
   * 1. Validate Turnstile token
   * ----------------------------------------
   */
  if (!input.turnstileToken) {
    return {
      applyAsAgent: {
        success: false,
        message:
          "Please complete the security verification.",
      },
    };
  }

  /**
   * ----------------------------------------
   * 2. Verify Turnstile server-side
   * ----------------------------------------
   */
  const isTurnstileValid =
    await verifyTurnstile(
      input.turnstileToken
    );

  if (!isTurnstileValid) {
    return {
      applyAsAgent: {
        success: false,
        message:
          "Security verification failed. Please try again.",
      },
    };
  }

  /**
   * ----------------------------------------
   * 3. Turnstile verified
   * ----------------------------------------
   */

  let imageId: number | null = null;

  /**
   * Upload image if provided.
   */
  if (input.image) {

    imageId =
      await uploadAgentImage(
        input.image
      );

  }

  /**
   * GraphQL variables.
   */
  const graphqlInput = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    description: input.description,
    facebook: input.facebook,
    twitter: input.twitter,
    linkedin: input.linkedin,
    instagram: input.instagram,
    imageId,
  };

  /**
   * Submit application through GraphQL.
   */
  return fetchGraphQL<AgentApplicationResponse>(
    APPLY_AS_AGENT_MUTATION,
    graphqlInput
  );
}