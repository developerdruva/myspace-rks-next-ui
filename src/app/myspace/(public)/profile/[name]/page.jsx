import ProfileSection from "../../../../../features/profile-page/ProfileSection";
import { Suspense } from "react";

const ProfilePage = () => {
  return (
    <Suspense fallback={""}>
      <ProfileSection />
    </Suspense>
  );
};

export default ProfilePage;
