import ADRTreeMap from "../../components/charts/treemaps/ADRTreeMap";

export default function LGAPage() {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <ADRTreeMap lgaName={"Whitsunday"} year={2023} />
    </div>
  );
}
