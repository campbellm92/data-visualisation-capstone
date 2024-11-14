import Card from "../../../components/ui/Cards";

export default function ServicesSection() {
  return (
    <>
      <div className="services-section bg-base-200 pt-10 h-full w-full">
        <div className="flex flex-col items-center">
          <div className="">
            <h1 className="pl-10 pb-6 text-2xl text-primary-content font-bold">
              OUR SERVICES
            </h1>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 px-4">
            <Card
              imgSrc="assets/images/lukas-blazek-mcSDtbWXUZU-unsplash.jpg"
              imgAlt="Data dashboard"
              cardTitle="Personalised data visualisation dashboard"
              cardContent="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            />
            <Card
              imgSrc="assets/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg"
              imgAlt="Person typing"
              cardTitle="Grant writing"
              cardContent="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            />
            <Card
              imgSrc="assets/images/chris-liverani-dBI_My696Rk-unsplash.jpg"
              imgAlt="Data on a graph"
              cardTitle="Forecasting"
              cardContent="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            />
            <Card
              imgSrc="assets/images/aranxa-esteve-pOXHU0UEDcg-unsplash.jpg"
              imgAlt="People sitting on grass"
              cardTitle="Event analysis"
              cardContent="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            />
            <Card
              imgSrc="assets/images/igor-omilaev-eGGFZ5X2LnA-unsplash.jpg"
              imgAlt="Computer chip"
              cardTitle="AI-driven insights"
              cardContent="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            />
            <Card
              imgSrc="assets/images/zhimai-zhang-2vl2xFZyiJo-unsplash.jpg"
              imgAlt="Islands in the Whitsundays"
              cardTitle="Tourism profiles"
              cardContent="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            />
          </div>
        </div>
      </div>
    </>
  );
}
