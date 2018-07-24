import * as React from 'react';

import Links from '../Links/Links';

import * as moment from 'moment';

import './Instagram.css';

export interface IInstagramProps {
    profilePicture?: string;
    profileName?: string;
    message?: string;
    media?: string;
}

class Instagram extends React.Component<IInstagramProps> {
    public render() {
        return (
            <div className={'instagram'}>
                <div className={'instagram-header'}>
                    <img src={this.props.profilePicture ? this.props.profilePicture : require('../images/persona.png')} className={'instgram-persona'} />
                    <div className={'instagram-name'}>{this.props.profileName ? this.props.profileName : 'BeTheMatch'}</div>
                </div>
                <video width="588" controls={true}>
                    <source src={this.props.media} type="video/mp4" />
                    Your browser does not support HTML5 video.
                        </video>
                {/* <img src={this.props.media ? this.props.media : require('../images/placeholder.jpeg')} className={'instagram-media'} /> */}
                <div className={'instagram-actions'}>
                    <div className={'instagram-actions-left'}>
                        <i className={"icon ion-md-heart"} />
                        <div className={'instagram-actions-left-icon'}>
                            <i className={"icon ion-md-chatbubbles"} />
                        </div>
                    </div>
                    <div className={'instagram-actions-right'}>
                        <i className={"icon ion-md-bookmark"} />
                    </div>
                </div>
                <div className={'instagram-likes'}>57 likes</div>
                <div className={'instagram-comments-container'}>
                    <div className={'instagram-comment'}>
                        <div className={'instagram-comment-name'}>{this.props.profileName ? this.props.profileName : 'BeTheMatch'}</div>
                        <div className={'instagram-comment-text'}>{this.props.message ? this.props.message : 'Be the Match Find a Cure'}<Links /></div>
                    </div>
                </div>
                <div className={'instagram-time'}>{moment().fromNow()}</div>
            </div>
        );
    }
}

export default Instagram;
