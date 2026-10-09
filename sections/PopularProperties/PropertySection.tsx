import PropertySlider from "../../components/PropertySlider";
import type { HomeProperty } from "@/types/home";

export default function PropertySection({ properties }: { properties: HomeProperty[] }) {
  return (
    <div className="section">
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-lg-6">
            <h2 className="font-weight-bold text-primary heading">
              Popular Properties
            </h2>
          </div>
        </div>

        <PropertySlider
          properties={properties}
        />
      </div>
    </div>
  );
}
