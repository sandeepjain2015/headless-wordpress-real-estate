import Image from "next/image";

type Props = {
  agent: any;
};

export default function AgentCard({ agent }: Props) {

  if (!agent) return null;

  const details = agent.userDetails;
console.log("Agent Details:", details); // Debugging line to check agent details
  return (
   <div className="d-block agent-box p-5">

      <div className="flex flex-col items-center">

        <Image
          src={agent.avatar.url}
          alt={agent.name}
          width={120}
          height={120}
          className="rounded-full"
        />

        <h3 className="text-2xl font-semibold mt-4">
          {agent.name}
        </h3>

        <p className="meta mb-3">
          {details.designation}
        </p>

      </div>

      <div className="mt-8 space-y-3">

        <p>
          📞 {details.phone}
        </p>
<ul className="list-unstyled social dark-hover d-flex">
                 
                
        {details.facebook && (
          <li className="me-1">
                    <a href={details.facebook} target="_blank">
                      <span className="icon-facebook"></span>
                    </a>
                  </li>
        )}

        {details.twitter && (
          <li className="me-1">
            <a href={details.twitter} target="_blank">
              <span className="icon-twitter"></span>
            </a>
          </li>
        )}

        {details.linkedin && (
          <li className="me-1">
            <a href={details.linkedin} target="_blank">
              <span className="icon-linkedin"></span>
            </a>
          </li>
        )}

        {details.instagram && (
          <li className="me-1">
            <a href={details.instagram} target="_blank">
              <span className="icon-instagram"></span>
            </a>
          </li>
        )}
</ul>
      </div>

    </div>
  );
}