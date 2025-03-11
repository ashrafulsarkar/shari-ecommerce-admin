import Wrapper from "@/layout/wrapper";
import Breadcrumb from "./../components/breadcrumb/breadcrumb";
import ReportsTables from "../components/reports/reports-tables";

const ReportsPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Reports" subtitle="Reports List" />
        {/* breadcrumb end */}

        <div className="col-span-12 lg:col-span-8">
        <ReportsTables />
      </div>
      </div>
    </Wrapper>
  );
};

export default ReportsPage;
