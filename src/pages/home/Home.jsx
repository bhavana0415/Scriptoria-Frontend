import { lazy, Suspense } from "react";

import Loader from "../../components/Loader";

const Welcome = lazy(() => import("../../components/Welcome"));
const Slider = lazy(() => import("../../components/Slider"));
const EditorPicks = lazy(() => import("../../components/EditorPicks"));
const Reviews = lazy(() => import("../../components/Reviews"));

function Home() {
  return (
    <Suspense fallback={<Loader isLoading={true} />}>
      <Welcome />
      <Slider />
      <EditorPicks />
      <Reviews />
    </Suspense>
  );
}
export default Home;
