/** @format */
import SubscriptionFeedAnimation from '../../components/animation/SubscriptionFeedAnimation';
import SubCard from './SubCard';

export default function SubFeed() {
    return (
        <div className="relative shadow-inner bg-slate-900/50">
            <div className="fixed absolute top-0 bottom-0 right-0 z-30 w-24 bg-gradient-to-l from-slate-900" />
            <SubscriptionFeedAnimation>
                {[{node: {title: 'Test Subscription'}}].map((sub) => {
                    return (
                        <SubCard
                            key={sub.node.title}
                            id={sub.node.title}
                        />
                    );
                })}
            </SubscriptionFeedAnimation>
            <div />
        </div>
    );
}
