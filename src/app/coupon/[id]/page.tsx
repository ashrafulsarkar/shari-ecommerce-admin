"use client";
import { useEffect, useState } from "react";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import CouponEditArea from "@/app/components/coupon/coupon-edit-area";

const CouponDynamicPage = ({ params }: any) => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      // Simulate an async operation to fetch params
      const fetchedParams = await new Promise<{ id: string }>((resolve) =>
        setTimeout(() => resolve(params), 1000)
      );
      setId(fetchedParams.id);
    };

    fetchParams();
  }, [params]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Coupon" subtitle="Coupon List" />
        {/* breadcrumb end */}

        {/* coupon area start */}
        <CouponEditArea id={id} />
        {/* coupon area end */}
      </div>
    </Wrapper>
  );
};

export default CouponDynamicPage;