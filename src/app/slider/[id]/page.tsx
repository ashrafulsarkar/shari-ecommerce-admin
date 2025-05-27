import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EditSlider from "@/app/components/slider/edit-slider";

const EditSliderPage = async ({ params }: any) => {
  const { id } = await params
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Edit Album" subtitle="Edit Album" />
        {/* breadcrumb end */}

        {/* edit category start */}
        <EditSlider id={id} />
        {/* edit category end */}
      </div>
    </Wrapper>
  );
};

export default EditSliderPage;
