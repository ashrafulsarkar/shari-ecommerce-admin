import Wrapper from "@/layout/wrapper";
import Breadcrumb from "./../components/breadcrumb/breadcrumb";
import SliderTables from "../components/slider/slider-tables";

const SliderPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Slider" subtitle="Slider List" />
        {/* breadcrumb end */}

        <div className="col-span-12 lg:col-span-8">
        <SliderTables />
      </div>
      </div>
    </Wrapper>
  );
};

export default SliderPage;
