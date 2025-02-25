import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import BlogSubmit from "../components/blogs/add-blog/blog-submit";

const AddBlog = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Add Blog" subtitle="Add Blog" />
        {/* breadcrumb end */}

        {/* add a Blog start */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 2xl:col-span-12">
            <BlogSubmit />
          </div>
        </div>
        {/* add a Blog end */}
      </div>
    </Wrapper>
  );
};

export default AddBlog;
