import React from "react";
import Icon1 from "../../images/svg-1.svg";
import Icon2 from "../../images/svg-2.svg";
import Icon3 from "../../images/svg-3.svg";
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from "./ServicesElements";

const Services = () => {
    return(
        <ServicesContainer id="benefits">
            <ServicesH1>Benefits</ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2>Reduce time</ServicesH2>
                    <ServicesP>We help reduce your time searching healthy and delicious food recipes.</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2>Multiple Options</ServicesH2>
                    <ServicesP>Find food recipes suitable for everyone in the family, including the little ones.</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2>Full Data</ServicesH2>
                    <ServicesP>Proive you with all the data to start making healthy and delicious meals.</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Services;