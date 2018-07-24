import * as React from 'react';
import './Links.css';

class Links extends React.Component {
    public render() {
        return (
            <div className={'links'}>
                &nbsp;
                <a href={'https://join.bethematch.org/s/landing'}>Register</a>
                &nbsp;
                <a href={'https://bethematch.org/transplant-basics/'}>Learn More</a>
                &nbsp;
                <a href={'http://www.aadp.org/donations/'}>Give</a>
            </div>
        );
    }
}

export default Links;
