import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import EditCustomer from "@/app/components/customer/edit-customer";

const EditCustomerPage = async ({ params }: any) => {
  const { id } = await params
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Edit Customer" subtitle="Edit Customer" />
        {/* breadcrumb end */}

        {/* edit category start */}
        <EditCustomer id={id} />
        {/* edit category end */}
      </div>
    </Wrapper>
  );
};

export default EditCustomerPage;
