import Wrapper from "@/layout/wrapper";
import Breadcrumb from "./../components/breadcrumb/breadcrumb";
import AreaTables from "../components/area/area-tables";

const SliderPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Area" subtitle="Area List" />
        {/* breadcrumb end */}

        <div className="col-span-12 lg:col-span-8">
        <AreaTables />
      </div>
      </div>
    </Wrapper>
  );
};

export default SliderPage;
