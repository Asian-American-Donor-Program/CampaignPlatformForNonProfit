import * as React from 'react';

import Footer from './Footer/Footer';
import Header from './Header/Header';

import CreateCampaignPage from './CreateCampaignPage/CreateCampaignPage'
import CreateProfilePage from './CreateProfilePage/CreateProfilePage';

import './App.css';

export interface IAppState {
  tab: number;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      tab: 0
    }

    this.onCreateCampaign = this.onCreateCampaign.bind(this);
    this.onViewModify = this.onViewModify.bind(this);
    this.onNearby = this.onNearby.bind(this);
    this.onCreateProfile = this.onCreateProfile.bind(this);
  }

  public render() {
    return (
      <React.Fragment>
        <Header />
        <div className="App">
          <div className={'App-mission'}>You have the power to make a difference in the lives of patients and donors. Join the thousands of volunteers who selflessly give their time and talent to support our life-saving mission.</div>
          <div className={'app-tabbar'}>
            <div onClick={this.onCreateCampaign} className={this.state.tab === 0 ? 'app-tabbar-selected app-tabbar-item' : 'app-tabbar-unselected app-tabbar-item'}>Create Campaign</div>
            <div onClick={this.onViewModify} className={this.state.tab === 1 ? 'app-tabbar-selected app-tabbar-item' : 'app-tabbar-unselected app-tabbar-item'}>View/Modify Campaign</div>
            <div onClick={this.onNearby} className={this.state.tab === 2 ? 'app-tabbar-selected app-tabbar-item' : 'app-tabbar-unselected app-tabbar-item'}>View Nearby Events</div>
            <div onClick={this.onCreateProfile} className={this.state.tab === 3 ? 'app-tabbar-selected app-tabbar-item' : 'app-tabbar-unselected app-tabbar-item'}>Create Profile</div>
          </div>
          {
            this.state.tab === 0 ? <CreateCampaignPage /> : null
          }
          {
            this.state.tab === 1 ? null : null
          }
          {
            this.state.tab === 2 ? null : null
          }
          {
            this.state.tab === 3 ? <CreateProfilePage /> : null
          }
          <hr />
        </div>
        <Footer />
      </React.Fragment >
    );
  }

  onCreateCampaign() {
    this.setState({ tab: 0 });
  }

  onViewModify() {
    this.setState({ tab: 1 });
  }

  onNearby() {
    this.setState({ tab: 2 });
  }

  onCreateProfile() {
    this.setState({ tab: 3 });
  }

}

export default App;
