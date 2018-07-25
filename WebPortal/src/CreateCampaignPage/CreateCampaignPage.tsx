import * as React from 'react';

import Facebook from '../Facebook/Facebook';
import Instagram from '../Instagram/Instagram';
import Twitter from '../Twitter/Twitter';

import { getTags, getKeywords, getLinks, getNewGUID, getData, postData } from '../Utils/utils';

import './CreateCampaignPage.css';

import { ethnicityList } from '../Utils/ethnicity';

export interface ICreateCampaignPageState {
    ethnicity: string;
    generic: boolean;
    guid: string;
    loading: boolean;
    loaded: boolean;
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

class CreateCampaignPage extends React.Component<{}, ICreateCampaignPageState> {
    clicked = -1;

    constructor(props: {}) {
        super(props);

        this.state = {
            ethnicity: '',
            generic: false,
            guid: '',
            loading: false,
            loaded: false,
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

        this.onSubmit = this.onSubmit.bind(this);
        this.onPost = this.onPost.bind(this);
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
                    <form onSubmit={this.onSubmit} className={'app-form'}>
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
                        <div className={'app-information-generic'}>
                            <div className={'app-form-target'}>
                                <div className={'app-form-target-title'}>Personalized</div>
                            </div>
                            <div className={'app-form-ethnicity'}>
                                <div className={'app-form-ethnicity-title'}>Message</div>
                                <input type={'text'} id={'message'} className={'app-form-message-input'} required={true} />
                            </div>
                        </div>
                        <div className={'app-form-footer'}>
                            <input id="image-file" type="file" className={'app-input'} accept={'.mp4, .jpg'} required={true} />
                            <div style={{ padding: 5 }} />
                            <input onClick={() => { this.clicked = 0; }} type="submit" value="Preview" className={'app-input'} />
                            <div style={{ padding: 5 }} />
                            <input onClick={() => { this.clicked = 1; }} type="submit" value="Post to Social Media" className={'app-input'} disabled={!this.state.loaded} />
                            {
                                this.state.posting || this.state.loading ?
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

    private onSubmit(e: any) {
        e.preventDefault();

        if (this.clicked === 0) {
            this.onPreview();
        }
        else if (this.clicked === 1) {
            this.onPost();
        }
    }

    private onPost() {

        let confirm = window.confirm('Post to Social Media?');

        if (confirm) {
            this.setState({ posting: true });
            const fr = new FileReader();
            fr.onload = () => {
                const data = fr.result;
                const base64 = btoa(data);
                const typeArray = this.state.mediaType.split('/');
                const type = typeArray[0];
                const ext = typeArray[1];

                this.setState({ mediaArray: base64 });

                if (this.state.message.length > 280) {
                    alert('Tweet too long. Please shorten tweet.');
                }
                else {
                    let url = 'https://contentpublisherapp.azurewebsites.net/api/CampaignPublisher?code=xBXdwIOJ5bAybRXcCm9LyN61IWavNk43a6CJLUtxg9zwZrPVVQW4CQ==';
                    // url = 'notaurl'; // uncomment to disable posting4
                    // publishing api
                    postData(url, { media: base64, mediaCategory: type, mediaType: ext, message: this.state.message })
                        .then(response => {
                            console.log(response);
                            this.setState({ posting: false, posted: true, twitter: response });

                            postData('https://urlcreate.azurewebsites.net/api/PostedURLs?code=t36ZnawOQ7peWX4D2x6jwhkLJPTlu1z3px8l4QqA12/snXpVBc2w/A==', { GUID: this.state.guid, PostedURL: response })
                                .then(response => {
                                    console.log(response);
                                }) // JSON from `response.json()` call
                                .catch(error => console.error(error));

                        }) // JSON from `response.json()` call
                        .catch(error => console.error(error));
                }
            };
            fr.readAsBinaryString(this.state.media);
        }
    }

    private onPreview() {
        // @ts-ignore
        const ethnicityInput = document.getElementById('ethnicity') ? document.getElementById('ethnicity').value : '';
        // @ts-ignore
        const messageInput = document.getElementById("message") ? document.getElementById("message").value : undefined;
        // @ts-ignore
        const file = document.getElementById("image-file").files[0];
        const fileUrl = URL.createObjectURL(file);
        const fileType = file.type;

        this.setState({ loading: true });

        // ethnicity api
        getData(`https://recommendationengine.azurewebsites.net/api/recommendations/${ethnicityInput}`)
            .then(response => {

                const tags = getTags(response.SuggestedTags);
                console.log(tags);

                // keyword api
                postData(`https://recommendationengine.azurewebsites.net/api/recommendations`, messageInput)
                    .then(response => {

                        const keywords = getKeywords(response.SuggestedKeywordTags);
                        console.log(keywords);

                        const guidInput = getNewGUID();

                        // links api
                        postData(`https://urlcreate.azurewebsites.net/api/URLCreation?code=VGUNUOHanZnWnR7o6DgrtuDaR2WUu1zoYBvW64sqmbPNOWtoQ1vmIg==`, { GUID: guidInput })
                            .then(response => {

                                const links = getLinks(response);
                                console.log(links);

                                const messageOut = messageInput + links + tags + keywords;
                                console.log(messageOut);

                                this.setState({ ethnicity: ethnicityInput, guid: guidInput, media: file, mediaType: fileType, mediaUrl: fileUrl, preview: true, loading: false, loaded: true, message: messageOut });
                            }) // JSON from `response.json()` call
                            .catch(error => console.error(error));
                    }) // JSON from `response.json()` call
                    .catch(error => console.error(error));
            }) // JSON from `response.json()` call
            .catch(error => console.error(error));
    }
}

export default CreateCampaignPage;
