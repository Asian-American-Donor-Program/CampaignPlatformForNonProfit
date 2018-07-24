import * as React from 'react';
import './Header.css';

class Header extends React.Component {
    public render() {
        return (
            <div className={'header'}>
                <img src={require('../images/bethematch.png')} className={'header-btm'} />
                <img src={require('../images/aadp.jpg')} className={'header-aadp'} />
            </div>
        );
    }
}

export default Header;
