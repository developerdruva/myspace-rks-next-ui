import Login from "../auth/Login";
import AdminBoard from "../DataEntry/AdminBoard";
import LoginExample from "../extras/LoginExample";
import ProfileForm from "../forms/PersonData";
import CoverPage from "../main/CoverPage";
import LandingPage from "../main/LandingPage";
import ScrollSpy from "../main/scrollspy/ScrollSpy";
import WelcomePage from "../main/WelcomePage";
import PDFsample from "../../src/features/resumes/extras/PDFsample";
import ResumeTemplateSample from "../../src/features/resumes/templates/ResumeTemplateSample";
// import Sample from "../tasks/sample";
import Stopwatch from "../../src/features/tasks/Stopwatch";
import TempWatch from "../../src/features/tasks/TempWatch";
import Theme from "../../src/features/tasks/Theme";
// import Sample from "../tasks/Sample";

export const CustomRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  // {
  //     path: '/rajeshprofile',
  //     element: <WelcomePage />,
  // },
  {
    path: "/resumetemplatesample",
    element: <ResumeTemplateSample />,
  },
  {
    path: "/samplepdfreact",
    element: <PDFsample />,
  },
  {
    path: "/stopwatch",
    element: <Stopwatch />,
  },
  {
    path: "/tempwatch",
    element: <TempWatch />,
  },
  {
    path: "/personform",
    element: <ProfileForm />,
  },
  {
    path: "/loginexample",
    element: <LoginExample />,
  },
  {
    path: "/adminboard",
    element: <AdminBoard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/theme",
    element: <Theme />,
  },
];
