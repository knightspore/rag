import {Maybe} from 'graphql/jsutils/Maybe';
import {IoShareSharp} from 'react-icons/io5';
import {RWebShare} from 'react-web-share';

type Props = {
  title: Maybe<string>;
    subscription: Maybe<string>;
    url: Maybe<string>;
};

export default function ShareButton({title, subscription, url}: Props) {
    return (
        <RWebShare
            data={{
                text: `${title} (${subscription})`,
                url: `${url}`,
                title: `${title} | Shared from RAG RSS Reader`,
            }}
        >
            <button>
                <IoShareSharp size={18} />
            </button>
        </RWebShare>
    );
}
