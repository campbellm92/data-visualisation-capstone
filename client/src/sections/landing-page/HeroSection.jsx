import { ButtonMediumWide } from "../../components/ui/Buttons";

export default function HeroSection() {
  return (
    <div>
      <div className="hero bg-base-300 min-h-screen">
        <div className="hero-content text-primary-content text-center z-auto">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <ButtonMediumWide>Hey</ButtonMediumWide>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
