import Wrapper from "@/layout/wrapper";
import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import EditBlogSubmit from "@/app/components/blogs/edit-blog/edit-blog-submit";

const EditProduct = async ({ params }: any) => {
  const {id} = await params;
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Edit Blog" subtitle="Edit Blog" />
        {/* breadcrumb end */}

        {/* add a product start */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 2xl:col-span-12">
            <EditBlogSubmit id={id} />
          </div>
        </div>
        {/* add a product end */}
      </div>
    </Wrapper>
  );
};

export default EditProduct;
