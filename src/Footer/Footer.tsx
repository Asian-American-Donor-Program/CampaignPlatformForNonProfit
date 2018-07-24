import * as React from 'react';
import './Footer.css';

class Footer extends React.Component {
    public render() {
        return (
            <div className={'footer'}>
                <a href={'https://join.bethematch.org/s/landing'}>Register</a>
                <div className={'footer-divider'}>|</div>
                <a href={'https://bethematch.org/transplant-basics/'}>Learn More</a>
                <div className={'footer-divider'}>|</div>
                <a href={'http://www.aadp.org/donations/'}>Give</a>
            </div>
        );
    }
}

export default Footer;
