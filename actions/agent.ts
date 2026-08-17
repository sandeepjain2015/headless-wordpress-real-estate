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
};

export type AgentApplicationResponse = {
  applyAsAgent: {
    success: boolean;
    message: string;
  };
};

export async function submitAgentApplication(
  input: AgentApplicationData
): Promise<AgentApplicationResponse> {
  // Image will be handled separately.
  // Do not send File through the JSON GraphQL request.
  const { image, ...graphqlInput } = input;

  return fetchGraphQL<AgentApplicationResponse>(
    APPLY_AS_AGENT_MUTATION,
    graphqlInput
  );
}