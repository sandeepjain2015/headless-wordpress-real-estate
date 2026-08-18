"use server";

import { cookies } from "next/headers";

import { fetchGraphQL } from "@/lib/wordpress";
import { SUBMIT_PROPERTY_MUTATION } from "@/graphql/property";
import { MY_PROPERTIES_QUERY } from "@/graphql/property";
import { authenticatedGraphQL } from "@/graphql/authenticatedGraphQL";
import { redirect } from "next/navigation";
export type PropertyApplicationData = {
  title: string;
  content: string;
  price: string;
  area: string;
  bedroom: string;
  bathroom: string;
  mapEmbed: string;
  featuredImage: File | null;
};

type PropertyResponse = {
  submitPropertyForReview: {
    success: boolean;
    message: string;
    propertyId: string | null;
  };
};

/**
 * Upload image to WordPress Media Library.
 */
async function uploadMedia(
  file: File,
  token: string
): Promise<number> {

  const siteUrl = process.env.WP_SITE_URL;

  if (!siteUrl) {
    throw new Error("WP_SITE_URL is not defined.");
  }

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  const response = await fetch(
    `${siteUrl}/wp-json/wp/v2/media`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Disposition": `attachment; filename="${file.name}"`,
        "Content-Type": file.type,
      },

      body: buffer,
    }
  );

  const responseText = await response.text();

  

  if (!response.ok) {
    throw new Error(
      `Media upload failed: ${response.status} - ${responseText}`
    );
  }

  const media = JSON.parse(responseText);

  return Number(media.id);
}

export async function submitProperty(
  input: PropertyApplicationData
): Promise<PropertyResponse> {

  const cookieStore = await cookies();

  const token =
    cookieStore.get("wp_auth_token")?.value;

  if (!token) {
    throw new Error(
      "You must be logged in to submit a property."
    );
  }

  let featuredImageId: number | null = null;

  if (input.featuredImage) {
    featuredImageId = await uploadMedia(
      input.featuredImage,
      token
    );
  }

  return fetchGraphQL<PropertyResponse>(
    SUBMIT_PROPERTY_MUTATION,
    {
      input: {
        title: input.title,
        description: input.content,
        price: input.price,
        area: input.area,
        bedroom: input.bedroom,
        bathroom: input.bathroom,
        mapEmbed: input.mapEmbed,
        featuredImageId,
      },
    },
    token
  );
}
export type AgentProperty = {
  databaseId: number;

  title: string;

  slug: string;

  status: string;

  date: string;

  featuredImage: {
    node: {
      sourceUrl: string;

      altText: string | null;
    } | null;
  } | null;
};

export type MyPropertiesResponse = {
  properties: {
    nodes: AgentProperty[];
  };
};
export async function getMyProperties(): Promise<MyPropertiesResponse> {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("wp_auth_token")?.value;

  if (!token) {
    //redirect to login page if not logged in
    redirect("/login");
  }

  const userCookie =
    cookieStore.get("wp_user")?.value;

  

  if (!userCookie) {
    throw new Error(
      "User information not found."
    );
  }

  const user = JSON.parse(userCookie);

  

  const agentId = Number(
    user.databaseId
  );

  

  

  const result =
    await authenticatedGraphQL<MyPropertiesResponse>(
      MY_PROPERTIES_QUERY,
      {
        authorId: agentId,
      }
    );

  

  return result;
}