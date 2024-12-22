import EditorPicks from "../../components/EditorPicks";
import Reviews from "../../components/Reviews";
import Slider from "../../components/Slider";
import { Welcome } from "../../components/Welcome";

function Home() {
  return (
    <>
      <Welcome />
      <Slider />
      <EditorPicks />
      <Reviews />
    </>
  );
}
export default Home;
