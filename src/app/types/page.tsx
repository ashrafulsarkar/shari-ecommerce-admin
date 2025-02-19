import Wrapper from "@/layout/wrapper";
import AddType from "../components/type/add-type";
import Breadcrumb from "../components/breadcrumb/breadcrumb";

const TypePage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Types" subtitle="Types" />
        {/* breadcrumb end */}

        {/*add category area start */}
        <AddType />
        {/*add category area end */}
      </div>
    </Wrapper>
  );
};

export default TypePage;
