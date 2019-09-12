import * as React from "react";
import { PopoutWrapper, Gallery, Div, Group, Button } from "@vkontakte/vkui";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";

import "./styles.scss";

interface IProps {
    onUpdateVisibility;
}

interface IState {
    slideIndex: number;
}

export class SubscriptionPopover extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.updateVisibility = this.updateVisibility.bind(this);
    }

    state = {
        slideIndex: null
    };

    updateVisibility = () => {
        this.props.onUpdateVisibility(false);
    }

    render() {
        const { slideIndex } = this.state;

        return (
            <PopoutWrapper v="center" h="center">
                <div className="subscription-popover">
                    <Div className="subscription-popover__close">
                        <Icon24Dismiss onClick={() => this.updateVisibility()} />
                    </Div>
                    <Group title="">
                        <Gallery
                            slideWidth="90%"
                            align="center"
                            bullets="light"
                            slideIndex={slideIndex}
                            onChange={(slideIndex: number) => this.setState({ slideIndex })}
                            style={{ marginTop: 30, height: 350 }}
                        >
                            <div style={{ backgroundColor: "#3d9fac" }}>Subscription 1</div>
                            <div style={{ backgroundColor: "#feb836" }}>Subscription 2</div>
                            <div style={{ backgroundColor: "#5b4470" }}>Subscription 3</div>
                        </Gallery>
                    </Group>
                    <Div className="subscription-popover__button">
                        <Button size="xl" level="outline">Купить</Button>
                    </Div>
                </div>
            </PopoutWrapper>
        );
    }
}
