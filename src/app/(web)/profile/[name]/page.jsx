import ProfileSection from "@/components/profilepage-items/ProfileSection";
import { Suspense } from "react";

const ProfilePage = () => {
  return (
    <Suspense fallback={<h1 color="red">Loading...</h1>}>
      <ProfileSection />
    </Suspense>
  );
};

export default ProfilePage;
