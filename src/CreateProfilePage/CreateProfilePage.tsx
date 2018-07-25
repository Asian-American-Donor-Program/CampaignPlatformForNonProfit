import * as React from 'react';

// import { getData, postData } from '../Utils/utils';

import './CreateProfilePage.css';


import { ethnicityList } from '../Utils/ethnicity';

export interface ICreateProfilePageState {
    posted: boolean;
    posting: boolean;
}

class CreateProfilePage extends React.Component<{}, ICreateProfilePageState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            posted: false,
            posting: false
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    public render() {
        return (
            <React.Fragment>
                <div className={'app-information'}>
                    <form onSubmit={this.onSubmit} className={'app-form'}>
                        <div className={'app-information-generic'}>
                            <div className={'app-form-ethnicity'}>
                                <div className={'app-form-ethnicity-title'}>First Name</div>
                                <input type={'text'} id={'firstName'} className={'app-form-message-input'} required={true} />
                            </div>
                        </div>
                        <div className={'app-information-generic'}>
                            <div className={'app-form-ethnicity'}>
                                <div className={'app-form-ethnicity-title'}>Last Name</div>
                                <input type={'text'} id={'lastName'} className={'app-form-message-input'} required={true} />
                            </div>
                        </div>
                        <div className={'app-information-generic'}>
                            <div className={'app-form-ethnicity'}>
                                <div className={'app-form-ethnicity-title'}>Birthday</div>
                                <input type={'date'} id={'birthday'} className={'app-form-message-input'} required={true} />
                            </div>
                        </div>
                        <div className={'app-information-generic'}>
                            <div className={'app-form-ethnicity'}>
                                <div className={'app-form-ethnicity-title'}>Ethnicity</div>
                                <select className={'app-form-message-input'} name={'ethnicity'} id={'ethnicity'}>
                                    {
                                        ethnicityList.map((value, index) => <option key={index} value={value}>{value}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className={'app-information-generic'}>
                            <div className={'app-form-ethnicity'}>
                                <div className={'app-form-ethnicity-title'}>Email</div>
                                <input type={'text'} id={'email'} className={'app-form-message-input'} required={true} />
                            </div>
                        </div>
                        <div className={'app-information-generic'}>
                            <div className={'app-form-ethnicity'}>
                                <div className={'app-form-ethnicity-title'}>Twitter Handle</div>
                                <input type={'text'} id={'twitter'} className={'app-form-message-input'} required={true} />
                            </div>
                        </div>
                        <div className={'app-form-footer'}>
                            {
                                !this.state.posted && !this.state.posting ?
                                    <input type="submit" value="Create Profile" className={'app-input'} /> :
                                    null
                            }
                            {
                                this.state.posting ?
                                    <div className={'loader-container'}><div className={'loader'} /></div>
                                    : null
                            }
                            {
                                this.state.posted ?
                                    <div>Done</div>
                                    : null
                            }
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }

    private onSubmit(e: any) {
        e.preventDefault();
        this.setState({ posting: true });
    }
}

export default CreateProfilePage;
