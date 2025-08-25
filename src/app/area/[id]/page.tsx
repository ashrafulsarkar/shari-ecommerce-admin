import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EditArea from "@/app/components/area/edit-area";

const EditSliderPage = async ({ params }: any) => {
  const { id } = await params
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Edit Area" subtitle="Edit Area" />
        {/* breadcrumb end */}

        {/* edit category start */}
        <EditArea id={id} />
        {/* edit category end */}
      </div>
    </Wrapper>
  );
};

export default EditSliderPage;
