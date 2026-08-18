import { fetchGraphQL } from "@/lib/wordpress";
import { GET_AGENTS_QUERY } from "@/graphql/agents";
import AgentCard from "@/components/AgentCard";

type Agent = {
  id: string;
  title: string;
  slug: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  };
};

type AgentsResponse = {
  agents: {
    nodes: Agent[];
  };
};
export default async function AgentSection() {
  const data = await fetchGraphQL<AgentsResponse>(GET_AGENTS_QUERY);
  

  return (
    <div className="section section-5 bg-light">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-6 mb-5">
            <h2 className="font-weight-bold heading text-primary mb-4">
              Our Agents
            </h2>
            <p className="text-black-50">
              Meet our dedicated team of real estate agents who are committed to helping you find the perfect property in Tikamgarh.
            </p>
          </div>
        </div>
        <div className="row">
        {data.agents.nodes.map((agent) => (
         <AgentCard key={agent.title} {...agent} />
        ))}
        </div>
      </div>
    </div>
  );
}