import * as React from 'react';

import Facebook from '../Facebook/Facebook';
import Instagram from '../Instagram/Instagram';
import Twitter from '../Twitter/Twitter';

import { getTags, getKeywords, getLinks, getNewGUID, getData, postData } from '../Utils/utils';

import './CreatePage.css';

import { ethnicityList } from '../Utils/ethnicity';

export interface ICreatePageState {
    ethnicity: string;
    generic: boolean;
    media: Blob;
    mediaArray: string;
    mediaType: string;
    mediaUrl: string;
    message: string;
    posting: boolean;
    posted: boolean;
    preview: boolean;
    twitter: string;
}

class CreatePage extends React.Component<{}, ICreatePageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            ethnicity: '',
            generic: false,
            media: new Blob(),
            mediaArray: '',
            mediaType: '',
            mediaUrl: '',
            message: 'Be the Match Find a Cure',
            posted: false,
            posting: false,
            preview: false,
            twitter: ''
        }

        this.onPreview = this.onPreview.bind(this);
        this.onGeneric = this.onGeneric.bind(this);
        this.onPersonal = this.onPersonal.bind(this);
    }

    public render() {
        return (
            <React.Fragment>
                <div className={'app-selector'}>
                    <div className={this.state.generic ? 'app-selector-inactive' : 'app-selector-active'} onClick={this.onPersonal}>Personalized</div>
                    <div className={this.state.generic ? 'app-selector-active' : 'app-selector-inactive'} onClick={this.onGeneric}>Generic</div>
                </div>
                <hr />
                <div className={'app-information'}>
                    <form onSubmit={this.onPreview} className={'app-form'}>
                        <div className={'app-information-generic'}>
                            <div className={'app-form-target'}>
                                <div className={'app-form-target-title'}>Target Audience</div>
                            </div>
                            <div className={'app-form-age'}>
                                <div className={'app-form-age-title'}>Age</div>
                                <div className={'app-form-age-input-container'}>
                                    <input type={'text'} className={'app-form-age-input'} required={true} />
                                    <div className={'dash'}>-</div>
                                    <input type={'text'} className={'app-form-age-input'} required={true} />
                                </div>
                            </div>
                            <div className={'app-form-ethnicity'}>
                                <div className={'app-form-ethnicity-title'}>Ethnicity</div>
                                <select className={'app-form-ethnicity-input'} name={'ethnicity'} id={'ethnicity'}>
                                    {
                                        ethnicityList.map((value, index) => <option key={index} value={value}>{value}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        {
                            this.state.generic ?
                                null :
                                <div className={'app-information-generic'}>
                                    <div className={'app-form-target'}>
                                        <div className={'app-form-target-title'}>Personalized</div>
                                    </div>
                                    <div className={'app-form-ethnicity'}>
                                        <div className={'app-form-ethnicity-title'}>Message</div>
                                        <input type={'text'} id={'message'} className={'app-form-message-input'} required={true} />
                                    </div>
                                </div>
                        }
                        <div className={'app-form-footer'}>
                            <input id="image-file" type="file" className={'app-input'} accept={'.mp4, .jpg'} />
                            <div style={{ padding: 5 }} />
                            {
                                !this.state.posted && !this.state.posting ?
                                    this.state.preview ?
                                        <input type="submit" value="Post to Social Media" className={'app-input'} /> :
                                        <input type="submit" value="Preview" className={'app-input'} /> :
                                    null
                            }
                            {
                                this.state.posting ?
                                    <div className={'loader-container'}><div className={'loader'} /></div>
                                    : null
                            }
                            {
                                this.state.posted ?
                                    <a href={this.state.twitter} target="_blank">Twitter</a>
                                    : null
                            }
                        </div>
                        {
                            this.state.preview ?
                                <React.Fragment>
                                    <hr />
                                    <div className={'app-preview-text'}>Twitter</div>
                                    <div className={'app-preview'}>
                                        <input type="checkbox" name="twitter" value="Twitter" id={'twitter'} className={'app-form-checkbox'} />
                                        <Twitter
                                            profilePicture={undefined}
                                            profileName={undefined}
                                            handle={undefined}
                                            tweet={this.state.message}
                                            media={this.state.mediaUrl}
                                            mediaType={this.state.mediaType}
                                        />
                                    </div>
                                    <div className={'app-preview-text'}>Facebook</div>
                                    <div className={'app-preview'}>
                                        <input type="checkbox" name="facebook" value="Facebook" id={'facebook'} className={'app-form-checkbox'} />
                                        <Facebook
                                            profilePicture={undefined}
                                            profileName={undefined}
                                            message={this.state.message}
                                            media={this.state.mediaUrl}
                                            mediaType={this.state.mediaType}
                                        />
                                    </div>
                                    <div className={'app-preview-text'}>Instagram</div>
                                    <div className={'app-preview'}>
                                        <input type="checkbox" name="instagram" value="Instagram" id={'instagram'} className={'app-form-checkbox'} />
                                        <Instagram
                                            profilePicture={undefined}
                                            profileName={undefined}
                                            message={this.state.message}
                                            media={this.state.mediaUrl}
                                            mediaType={this.state.mediaType}
                                        />
                                    </div>
                                </React.Fragment> : null
                        }
                    </form>
                </div>
            </React.Fragment>
        );
    }

    private onGeneric() {
        this.setState({ generic: true });
    }

    private onPersonal() {
        this.setState({ generic: false });
    }

    private onPreview(e: any) {
        e.preventDefault();

        if (this.state.preview) {
            this.setState({ preview: false, posting: true });
            const fr = new FileReader();
            fr.onload = () => {
                const data = fr.result;
                const base64 = btoa(data);
                const typeArray = this.state.mediaType.split('/');
                const type = typeArray[0];
                const ext = typeArray[1];

                this.setState({ mediaArray: base64 });

                // ethnicity api
                getData(`https://recommendationengine.azurewebsites.net/api/recommendations/${this.state.ethnicity}`)
                    .then(response => {

                        const tags = getTags(response.SuggestedTags);
                        console.log(tags);

                        // keyword api
                        postData(`https://recommendationengine.azurewebsites.net/api/recommendations`, this.state.message)
                            .then(response => {

                                const keywords = getKeywords(response.SuggestedKeywordTags);
                                console.log(keywords);

                                // links api
                                postData(`https://urlcreate.azurewebsites.net/api/URLCreation?code=VGUNUOHanZnWnR7o6DgrtuDaR2WUu1zoYBvW64sqmbPNOWtoQ1vmIg==`, { GUID: getNewGUID() })
                                    .then(response => {

                                        const links = getLinks(response);
                                        console.log(links);

                                        const message = this.state.message + links + tags + keywords;
                                        console.log(message);

                                        if (message.length > 280) {
                                            alert('Tweet too long. Please shorten tweet.');
                                        }
                                        else {
                                            // publishing api
                                            postData(`https://contentpublisherapp.azurewebsites.net/api/CampaignPublisher?code=xBXdwIOJ5bAybRXcCm9LyN61IWavNk43a6CJLUtxg9zwZrPVVQW4CQ==`, { media: base64, mediaCategory: type, mediaType: ext, message: this.state.message + links + tags + keywords })
                                                .then(response => {
                                                    console.log(response);
                                                    this.setState({ posting: false, posted: true, twitter: response });

                                                }) // JSON from `response.json()` call
                                                .catch(error => console.error(error));
                                        }
                                    }) // JSON from `response.json()` call
                                    .catch(error => console.error(error));
                            }) // JSON from `response.json()` call
                            .catch(error => console.error(error));
                    }) // JSON from `response.json()` call
                    .catch(error => console.error(error));
            };
            fr.readAsBinaryString(this.state.media);
        }
        else {
            // @ts-ignore
            const ethnicityInput = document.getElementById('ethnicity') ? document.getElementById('ethnicity').value : '';
            // @ts-ignore
            const messageInput = document.getElementById("message") ? document.getElementById("message").value : undefined;
            // @ts-ignore
            const file = document.getElementById("image-file").files[0];
            const fileUrl = URL.createObjectURL(file);
            const fileType = file.type;
            if (messageInput) {
                this.setState({ message: messageInput });
            }
            this.setState({ ethnicity: ethnicityInput, media: file, mediaType: fileType, mediaUrl: fileUrl, preview: true });
        }
    }
}

export default CreatePage;
