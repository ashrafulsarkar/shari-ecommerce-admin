import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import SettingArea from "../components/setting/setting-area";

const ProfilePage = () => {
  return (
    <Wrapper>
    <div className="body-content px-8 py-8 bg-slate-100">
      {/* breadcrumb start */}
      <Breadcrumb title="Setting" subtitle="Setting options" subChild={false} />
      {/* breadcrumb end */}

      {/* profile area start */}
      <SettingArea/>
      {/* profile area end */}
    </div>
    </Wrapper>
  );
};

export default ProfilePage;
