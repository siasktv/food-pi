import React, {useState} from "react";
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight } from "./HeroElements";
import Video from "../../videos/video.mp4"
import { Button1 } from "../ButtonElement";

const HeroSection = () => {

    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover)
    }

    return(
        <HeroContainer id="home">
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
            </HeroBg>
            <HeroContent>
                <HeroH1>Eating Healthy Never Been So Yummy!</HeroH1>
                <HeroP>Discover thousand of recipes to start a healthy lifestyle today.
                </HeroP>
                <HeroBtnWrapper>
                    <Button1 
                    to='/home'
                    onMouseEnter={onHover} 
                    onMouseLeave={onHover}
                    primary="true"
                    dark="true"
                    >
                        Get Started {hover ? <ArrowForward/> : <ArrowRight/>}
                    </Button1>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection; 