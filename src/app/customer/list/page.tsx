import Wrapper from "@/layout/wrapper";
import Breadcrumb from "./../../components/breadcrumb/breadcrumb";
import CustomerTables from "@/app/components/customer/customer-tables";

const CategoryPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Customer" subtitle="Customer List" />
        {/* breadcrumb end */}

        <div className="col-span-12 lg:col-span-8">
        <CustomerTables />
      </div>
      </div>
    </Wrapper>
  );
};

export default CategoryPage;
