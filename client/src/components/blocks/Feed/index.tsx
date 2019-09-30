import * as React from "react";
import { Group } from "@vkontakte/vkui";
import { IPost } from "@/entities/Post";
import { Post } from "../Post";

interface IProps {
    posts: IPost[];
    onUpdateVisibility: (elem: string, value: boolean) => any;
}

export class Feed extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.onUpdateVisibility = this.onUpdateVisibility.bind(this);
    }

    onUpdateVisibility() {
        this.props.onUpdateVisibility("actionSheet", true);
    }

    render() {
        const { posts } = this.props;

        return (
            <Group className="feed-block">
                {posts.map((post, i) => (
                    <Post
                        key={i}
                        name={post.name}
                        createdAt={post.createdAt}
                        avatar={post.avatar}
                        attachments={post.attachments}
                        onUpdateVisibility={this.onUpdateVisibility} />
                ))
                }
            </Group>
        );
    }
}
