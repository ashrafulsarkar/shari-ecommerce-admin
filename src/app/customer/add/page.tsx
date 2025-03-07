import Wrapper from "@/layout/wrapper";
import AddCustomer from "@/app/components/customer/add-customer";

const CategoryPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <AddCustomer/>
      </div>
    </Wrapper>
  );
};

export default CategoryPage;
