"use client";

import { useEffect, useState } from "react";
import EditType from "@/app/components/type/edit-type";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";

const TypePage = ({ params }: any) => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      // Simulate fetching params
      const fetchedParams = await Promise.resolve(params);
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
        <Breadcrumb title="Types" subtitle="Types" />
        {/* breadcrumb end */}

        {/*add category area start */}
        <EditType id={id} />
        {/*add category area end */}
      </div>
    </Wrapper>
  );
};

export default TypePage;