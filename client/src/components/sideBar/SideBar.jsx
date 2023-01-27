import React from "react";
import { SideBarContainer, Icon, CloseIcon, SideBarWrapper, SideBarMenu, SideBarLink, SideBtnWrap, SideBarRoute } from "./SideBarElements";

const SideBar = ({ isOpen, toggle }) => {
    return (
        <SideBarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SideBarWrapper>
                <SideBarMenu>
                    <SideBarLink to="/about">
                        About 
                    </SideBarLink>
                    <SideBarLink to="/discover">
                        Discover
                    </SideBarLink>
                </SideBarMenu>
                <SideBtnWrap>
                    <SideBarRoute to="/create ">
                        Create Recipe
                    </SideBarRoute>
                </SideBtnWrap>
            </SideBarWrapper>
        </SideBarContainer>
    )
}

export default SideBar;