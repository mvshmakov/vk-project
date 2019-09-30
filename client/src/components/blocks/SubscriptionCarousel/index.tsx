import * as React from "react";
import { Gallery, Group, Button } from "@vkontakte/vkui";

import { ISubscription } from "@/entities/Subscription";
import { PureBlock } from "@/utils/typings/Components";

import "./styles.scss";

interface IProps {
    subscriptionCards: ISubscription[];
    onSlideChange: (index: number) => void;
}

export class SubscriptionCarousel extends PureBlock<IProps, null> {
    constructor(props) {
        super(props);

        this.onSlideChange = this.onSlideChange.bind(this);
    }

    onSlideChange = (subscriptionSlideIndex: number) => {
        this.props.onSlideChange(subscriptionSlideIndex);
    }

    render() {
        const { subscriptionCards } = this.props;

        return (
            <Group className="subscription-carousel__gallery">
                <Gallery
                    slideWidth="65%"
                    align="center"
                    bullets="light"
                    onChange={this.onSlideChange}
                    style={{ marginTop: 15, marginBottom: 15, height: 290 }}
                >
                    {subscriptionCards.map((card, i) =>
                        <div key={i} className="subscription-carousel__gallery-card">
                            <div className="subscription-carousel__gallery-card-top">
                                <div className="subscription-carousel__gallery-text">{card.subscriptionName}</div>
                                <ul className="subscription-carousel__gallery-list">
                                    {card.stickers && <li>Стикеры</li>}
                                    {card.privateChat && <li>Чат с контент-мейкером</li>}
                                    {card.comments && <li>Доступ к комментариям</li>}
                                </ul>
                            </div>
                            <div className="subscription-carousel__gallery-card-bottom">
                                <div className="subscription-carousel__gallery-text">
                                    {card.subscriptionPrice + " руб. / " + (card.subscriptionPeriod === "monthly" ? "в месяц" : "в год")}
                                </div>
                                <Button level="outline" className="subscription-carousel__gallery-button">Купить</Button>
                            </div>
                        </div>
                    )}
                </Gallery>
            </Group>
        );
    }
}
