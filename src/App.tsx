import * as React from 'react';

import Facebook from './Facebook/Facebook';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Instagram from './Instagram/Instagram';
import Twitter from './Twitter/Twitter';

import './App.css';

export interface IAppState {
  generic: boolean;
  media: Blob;
  mediaArray: Uint8Array;
  mediaType: string;
  mediaUrl: string;
  message: string;
  preview: boolean;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      generic: false,
      media: new Blob(),
      mediaArray: new Uint8Array(8),
      mediaType: '',
      mediaUrl: '',
      message: 'Be the Match Find a Cure',
      preview: false
    }

    this.onPreview = this.onPreview.bind(this);
    this.onGeneric = this.onGeneric.bind(this);
    this.onPersonal = this.onPersonal.bind(this);
    this.postData = this.postData.bind(this);
  }

  public render() {
    return (
      <React.Fragment>
        <Header />
        <div className="App">
          <div className={'App-mission'}>You have the power to make a difference in the lives of patients and donors. Join the thousands of volunteers who selflessly give their time and talent to support our life-saving mission.</div>
          <div className={'app-tabbar'}>
            <div className={'app-tabbar-selected app-tabbar-item'}>Create Campaign</div>
            <div className={'app-tabbar-unselected app-tabbar-item'}>View/Modify Campaign</div>
            <div className={'app-tabbar-unselected app-tabbar-item'}>View Nearby Events</div>
          </div>
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
                  <input type={'text'} className={'app-form-ethnicity-input'} required={true} />
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
                      <input type={'text'} id={'message'} className={'app-form-ethnicity-input'} required={true} />
                    </div>
                  </div>
              }
              <div className={'app-form-footer'}>
                <input id="image-file" type="file" className={'app-input'} accept={'.mp4, .jpg'} />
                <div style={{ padding: 5 }} />
                {
                  this.state.preview ?
                    <input type="submit" value="Submit" className={'app-input'} /> :
                    <input type="submit" value="Preview" className={'app-input'} />
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
                      />
                    </div>
                  </React.Fragment> : null
              }
            </form>
          </div>
          <hr />
        </div>
        <Footer />
      </React.Fragment >
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
      const fr = new FileReader();
      fr.onload = () => {
        const data = fr.result;
        const array = new Uint8Array(data);
        const typeArray = this.state.mediaType.split('/');
        const type = typeArray[0];
        const ext = typeArray[1];

        this.setState({ mediaArray: array, preview: false });

        this.postData(`https://contentpublisherapp.azurewebsites.net/api/CampaignPublisher?code=N0cMytWqQzb6RvJTQ/krWvtwgY6Gh3TLNJaUshlms4QBXY30fVBdvA==`, { mediaByteArray: array, mediaType: type, extension: ext, message: this.state.message })
          .then(response => console.log(response)) // JSON from `response.json()` call
          .catch(error => console.error(error));
      };
      fr.readAsArrayBuffer(this.state.media);
    }
    else {
      // @ts-ignore
      const messageInput = document.getElementById("message") ? document.getElementById("message").value : undefined;
      // @ts-ignore
      const file = document.getElementById("image-file").files[0];
      const fileUrl = URL.createObjectURL(file);
      const fileType = file.type;
      if (messageInput) {
        this.setState({ message: messageInput });
      }
      this.setState({ media: file, mediaType: fileType, mediaUrl: fileUrl, preview: true });
    }
  }

  private postData(url = ``, data = {}) {
    // Default options are marked with *
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses response to JSON
      .catch(error => console.error(`Fetch Error =\n`, error));
  };
}

export default App;
