import AgentCard from "@/components/AgentCard";
import type { HomeAgent } from "@/types/home";

export default function AgentSection({ agents }: { agents: HomeAgent[] }) {

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
        {agents.map((agent) => (
         <AgentCard key={agent.title} {...agent} />
        ))}
        </div>
      </div>
    </div>
  );
}
