import * as React from "react";
import { Tabbar as VkuiTabbbar, TabbarItem } from "@vkontakte/vkui";
import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon24List from "@vkontakte/icons/dist/24/list";
import Icon24Search from "@vkontakte/icons/dist/24/search";
import Icon24Settings from "@vkontakte/icons/dist/24/settings";
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
            selected={activeRoute === "profile"}
            data-story="profile"
        >
            <Icon24User />
        </TabbarItem>
        {/* <TabbarItem
            onClick={onStoryChange}
            selected={activeRoute === "schedule"}
            data-story="schedule"
        >
            <Icon24List />
        </TabbarItem> */}
        <TabbarItem
            onClick={onStoryChange}
            selected={activeRoute === "search"}
            data-story="search"
        >
            <Icon24Search />
        </TabbarItem>
        <TabbarItem
            onClick={onStoryChange}
            selected={activeRoute === "settings"}
            data-story="settings"
        >
            <Icon24Settings />
        </TabbarItem>
    </VkuiTabbbar>
);
