import * as React from "react";
import { Tabbar as VkuiTabbbar, TabbarItem } from "@vkontakte/vkui";
import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon24Search from "@vkontakte/icons/dist/24/search";
import Icon24Newsfeed from "@vkontakte/icons/dist/24/newsfeed";
import "@vkontakte/vkui/dist/vkui.css";

import "./styles.scss";

interface IProps {
    activeRoute: string;
    onStoryChange: (...args: any) => any;
}

export default ({ activeRoute, onStoryChange }: IProps) => (
    <VkuiTabbbar>
        <TabbarItem
            onClick={onStoryChange}
            selected={activeRoute === "feed"}
            data-story="feed"
        >
            <Icon24Newsfeed />
        </TabbarItem>
        <TabbarItem
            onClick={onStoryChange}
            selected={activeRoute === "search"}
            data-story="search"
        >
            <Icon24Search />
        </TabbarItem>
        <TabbarItem
            onClick={onStoryChange}
            selected={activeRoute === "profile"}
            data-story="profile"
        >
            <Icon24User />
        </TabbarItem>
    </VkuiTabbbar>
);
