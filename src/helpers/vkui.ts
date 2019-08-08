import { platform, IOS } from "@vkontakte/vkui";

export const isAndroid = () => platform() === IOS;
