import * as React from "react";
import { Group } from "@vkontakte/vkui";
import "./styles.scss";
import { IPost } from "../../../entities/Post";
import { Post } from "../Post";

interface IProps {
    posts: IPost[];
    onUpdateVisibility: (value: boolean) => void;
}

export class Feed extends React.Component<IProps> {

    onUpdateVisibility() {
        this.props.onUpdateVisibility(true);
    }

    render() {
        const {posts} = this.props;

        return (
            <React.Fragment>
                <Group className="feed-block">
                    {posts.map((post, i) => (
                        <Post
                            key={i}
                            name={post.name}
                            createdAt={post.createdAt}
                            avatar={post.avatar}
                            attachments={post.attachments}
                            onUpdateVisibility={this.onUpdateVisibility}/>
                    ))
                    }
                </Group>
            </React.Fragment>
        );
    }
}
