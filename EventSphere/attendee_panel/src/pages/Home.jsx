import AboutSection from "../components/AboutSection";
import ExpoSection from "../components/ExpoSection";
import HeroSection from "../components/HeroSection";
import ScheduleSection from "../components/ScheduleSection";
import SpeakerSection from "../components/SpeakerSection";
import Preloader from "../components/preloader";

function Home() {
    return ( 
        <>
        <Preloader/>
        <HeroSection/>
        <AboutSection/>
        <SpeakerSection/>
        <ScheduleSection limit={2} showBookmarkButton={false}/>
        <ExpoSection limit={3}/>
        </>
     );
}

export default Home;