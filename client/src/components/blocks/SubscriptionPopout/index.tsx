import * as React from "react";
import { PopoutWrapper, Gallery, Div, Group, Button } from "@vkontakte/vkui";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";

import "./styles.scss";

interface IProps {
    onUpdateVisibility: (elem: string, value: boolean) => void;
}

interface IState {
    slideIndex: number;
}

// TODO: change to React.PureComponent
export class SubscriptionPopout extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.updateVisibility = this.updateVisibility.bind(this);
    }

    state = {
        slideIndex: null
    };

    updateVisibility = () => {
        this.props.onUpdateVisibility("popup", false);
    }

    onSlideChange = (slideIndex: number) => {
        this.setState({ slideIndex });
    }

    render() {
        const subscriptionCards = [1, 2, 3];

        const { slideIndex } = this.state;

        return (
            <PopoutWrapper v="center" h="center">
                <div className="subscription-popover">
                    <Div className="subscription-popover__close">
                        <Icon24Dismiss onClick={this.updateVisibility} />
                    </Div>
                    <Group title="">
                        <Gallery
                            slideWidth="90%"
                            align="center"
                            bullets="light"
                            slideIndex={slideIndex}
                            onChange={this.onSlideChange}
                            style={{ marginTop: 30, height: 350 }}
                            className="subscription-popover__gallery"
                        >
                            {subscriptionCards.map((card, i) =>
                                <div key={i} className="subscription-popover__gallery-card">Subscription {i + 1}</div>
                            )}
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
