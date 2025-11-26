import ProfileSection from "../../../../components/profilepage-items/ProfileSection";
import { Suspense } from "react";

const ProfilePage = () => {
  return (
    <Suspense fallback={""}>
      <ProfileSection />
    </Suspense>
  );
};

export default ProfilePage;
