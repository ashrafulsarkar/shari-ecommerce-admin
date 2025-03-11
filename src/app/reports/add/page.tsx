import Wrapper from "@/layout/wrapper";
import AddAlbum from "@/app/components/album/add-album";

const AlbumPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <AddAlbum/>
      </div>
    </Wrapper>
  );
};

export default AlbumPage;
