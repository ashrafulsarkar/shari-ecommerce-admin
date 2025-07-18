import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import BlogListArea from "../components/blogs/blog-lists/blog-list-area";

const ProductList = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Blog" subtitle="Blog List" />
        {/* breadcrumb end */}

        {/* ProductListArea start */}
        <BlogListArea />
        {/* ProductListArea end */}
      </div>
    </Wrapper>
  );
};

export default ProductList;
