import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";

async function getAlbum() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribe`, {
        next: { revalidate: 10 },
      });

    if (!response.ok) {
        return [];
    }
    const data = await response.json();
    return data ;
  }

const CategoryPage = async () => {
   const result = await getAlbum();
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Subscribe" subtitle="Subscribe List" />
        {/* breadcrumb left */}
      <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
      >
  {result.map((item: any, index: number) => (
    <div
      key={item._id}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        padding: "12px 16px",
        marginBottom: "10px",
        backgroundColor: "#f9fafb",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
        fontSize: "14px",
        color: "#1a202c",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <span><strong>SI:</strong> {index + 1}</span>
      <span>{item.email}</span>
    </div>
  ))}
</div>


      </div>
    </Wrapper>
  );
};

export default CategoryPage;
