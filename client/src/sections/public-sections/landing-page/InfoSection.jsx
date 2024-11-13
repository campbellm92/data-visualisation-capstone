import { ButtonMediumWide } from "../../../components/ui/Buttons";

export default function InfoSection() {
  return (
    <div>
      <div className="info-part bg-base-100 flex flex-col lg:flex-row-reverse items-center justify-center w-full">
        <div className="hero w-full h-full">
          <div className="hero-content flex-col lg:flex-row-reverse text-center justify-between lg:p-10">
            <img
              src="/assets/images/josh-withers-9h479w-syaQ-unsplash.jpg"
              className="max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-2xl object-cover sm:mt-6"
            />
            <div className="lg:mr-10 sm:my-6">
              <h3 className="mb-4 text-light font-bold text-secondary">
                OUR DATA IN YOUR HANDS
              </h3>
              <h1 className="text-5xl font-bold">
                Hey! 👋 We're{" "}
                <span className="text-bold text-primary underline decoration-secondary">
                  Localis
                </span>
              </h1>
              <p className="py-6">
                We provide lorem ipsum dolor sit amet consectetur adipisicing
                elit. Eius natus nemo quis! Quos, numquam sed tenetur,
                dignissimos nesciunt saepe iste eum incidunt similique deserunt
                cupiditate. Magnam facilis error ut fugit!
              </p>
              <ButtonMediumWide>Get a quote</ButtonMediumWide>
            </div>
          </div>
        </div>
      </div>

      <div className="client-logos-part bg-base-100 flex-grow">
        <div className="header bg-primary-content text-primary text-xl font-bold text-center pt-10">
          WHO WE'VE HELPED
        </div>
        <div className="banner">
          <img src="/assets/logos/companies-logos.png" alt="Company logos" />
        </div>
      </div>
    </div>
  );
}
