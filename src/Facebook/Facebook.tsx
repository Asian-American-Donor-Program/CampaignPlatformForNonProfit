import * as React from 'react';

import Links from '../Links/Links';

import * as moment from 'moment';

import './Facebook.css';

export interface IFacebookProps {
    profilePicture?: string;
    profileName?: string;
    message?: string;
    media?: string;
}

class Facebook extends React.Component<IFacebookProps> {
    public render() {
        return (
            <div className={'facebook'}>
                <div className={'facebook-header'}>
                    <img src={this.props.profilePicture ? this.props.profilePicture : require('../images/persona.png')} className={'facebook-persona'} />
                    <div className={'facebook-name-container'}>
                        <div className={'facebook-name'}>{this.props.profileName ? this.props.profileName : 'Be the Match Find a Cure'}</div>
                        <div className={'facebook-time-container'}>
                            <div className={'facebook-time'}>{moment().fromNow()}</div>
                            <div className={'facebook-dot'}>&middot;</div>
                            <i className={"icon ion-md-locate"} />
                        </div>
                    </div>
                </div>
                <div className={'facebook-message'}>{this.props.message ? this.props.message : 'Be the Match Find a Cure'}<Links /></div>
                <video width="588" controls={true}>
                    <source src={this.props.media} type="video/mp4" />
                    Your browser does not support HTML5 video.
                        </video>
                {/* <img src={this.props.media ? this.props.media : require('../images/placeholder.jpeg')} className={'facebook-media'} /> */}
                <div className={'facebook-actions'}>
                    <div className={'facebook-icon'}>
                        <i className={"icon ion-md-thumbs-up"} />
                        <div className={'facebook-icon-text'}>Like</div>
                    </div>
                    <div className={'facebook-icon'}>
                        <i className={"icon ion-md-chatbubbles"} />
                        <div className={'facebook-icon-text'}>Comment</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Facebook;
