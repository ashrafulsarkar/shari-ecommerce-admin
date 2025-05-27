import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";

async function getAlbum() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`, {
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
        <Breadcrumb title="Contacts" subtitle="Contacts List" />
        {/* breadcrumb left */}
 <table className="w-full text-base text-left text-gray-500 p-4 ">
              <thead>
                <tr className="border-b bg border-gray6 text-tiny">
                  <th scope="col" className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px]">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-left">
                    Email
                  </th>
                  <th scope="col" className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-left">
                    Subject
                  </th>
                  <th scope="col" className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-left">
                    Message
                  </th>
                  <th scope="col" className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-left">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.map((item: any) => (
                  <tr key={item._id} className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="px-3 py-3 pl-3 font-normal text-[#55585B]">
                      #{item._id.slice(2, 10)}
                    </td>
                    <td className="pr-8 py-5 whitespace-nowrap">
                      <a href="#" className="flex items-center space-x-5">
                        <span className="font-medium text-heading text-hover-primary transition">{item.name}</span>
                      </a>
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-left">
                      {item.email}
                    </td>
                    <td className="px-9 py-3 text-left">
                        {item.subject}
                    </td>
                    <td className="px-9 py-3 text-left">
                        {item.message}
                    </td>
                    <td className="px-9 py-3 text-left">
                        {item.createdAt.slice(0,10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

      </div>
    </Wrapper>
  );
};

export default CategoryPage;
