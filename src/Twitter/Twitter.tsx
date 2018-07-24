import * as React from 'react';

import Links from '../Links/Links';

import * as moment from 'moment';

import './Twitter.css';

export interface ITwitterProps {
    profilePicture?: string;
    profileName?: string;
    handle?: string;
    tweet?: string;
    media?: string;
}

class Twitter extends React.Component<ITwitterProps> {
    public render() {
        return (
            <div className={'twitter'}>
                <div className={'twitter-persona'}>
                    <img src={this.props.profilePicture ? this.props.profilePicture : require('../images/persona.png')} className={'twitter-persona'} />
                </div>
                <div className={'twitter-content'}>
                    <div className={'twitter-title-container'}>
                        <div className={'twitter-title'}>{this.props.profileName ? this.props.profileName : 'Be the Match Find a Cure'}</div>
                        <div className={'twitter-handle'}>{this.props.handle ? this.props.handle : '@BeTheMatch'}</div>
                        <div className={'twitter-time'}>&middot; {moment().fromNow()}</div>
                    </div>
                    <div className={'twitter-tweet'}>{this.props.tweet ? this.props.tweet : 'Only you can save lives'}<Links /></div>
                    <div className={'twitter-media-container'}>
                        <video width="500" controls={true}>
                            <source src={this.props.media} type="video/mp4" />
                            Your browser does not support HTML5 video.
                        </video>
                        {/* <img src={this.props.media ? this.props.media : require('../images/placeholder.jpeg')} className={'twitter-media'} /> */}
                    </div>
                    <div className={'twitter-actions'}>
                        <div className={'twitter-icon'}>
                            <i className={"icon ion-md-chatbubbles"} />
                            <div className={'twitter-icon-text'}>57</div>
                        </div>
                        <div className={'twitter-icon'}>
                            <i className={"icon ion-md-git-compare"} />
                            <div className={'twitter-icon-text'}>1.2K</div>
                        </div>
                        <div className={'twitter-icon'}>
                            <i className={"icon ion-md-heart"} />
                            <div className={'twitter-icon-text'}>5.7K</div>
                        </div>
                        <div className={'twitter-icon'}>
                            <i className={"icon ion-md-mail"} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Twitter;
