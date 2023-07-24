/** @format */

import SubscriptionCardAnimation from '../../components/animation/SubscriptionCardAnimation';
import Icon from '../../src/components/App/Icon';

type Props = {
    id: string;
};

export default function SubCard({id}: Props) {
    return (
        <SubscriptionCardAnimation>
            <div className="flex items-center p-1 px-2 select-none gap-2 card">
                <Icon />
                <h3 className="text-sm w-max">{id}</h3>
            </div>
        </SubscriptionCardAnimation>
    );
}
