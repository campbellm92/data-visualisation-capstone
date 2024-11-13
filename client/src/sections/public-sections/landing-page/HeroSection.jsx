import { ButtonMediumWide } from "../../../components/ui/Buttons";

export default function HeroSection() {
  return (
    <div>
      <div className="hero bg-base-300 min-h-screen -mt-10 z-auto">
        <div className="hero-content text-primary-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-6xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
              Data-driven{" "}
              <span className="underline decoration-secondary">insights</span>{" "}
              for smart{" "}
              <span className="underline decoration-secondary">tourism</span>
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <ButtonMediumWide>Get to know us</ButtonMediumWide>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
