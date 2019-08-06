import * as React from "react";
import { Tabbar as VkuiTabbbar, TabbarItem } from "@vkontakte/vkui";
import Icon28Search from "@vkontakte/icons/dist/28/search";
import Icon28KeyboardBotsOutline from "@vkontakte/icons/dist/28/keyboard_bots_outline";
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
            selected={activeRoute === "search"}
            data-story="search"
        >
            <Icon28Search />
        </TabbarItem>
        <TabbarItem
            onClick={onStoryChange}
            selected={activeRoute === "example"}
            label="test"
            data-story="example"
        >
            <Icon28KeyboardBotsOutline />
        </TabbarItem>
    </VkuiTabbbar>
);
