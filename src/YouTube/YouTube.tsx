import * as React from 'react';
import './YouTube.css';

class YouTube extends React.Component {
    public render() {
        return (
            <div className={'youtube'}>
                <iframe
                    frameBorder={0}
                    width={720}
                    height={450}
                    src={'https://www.youtube.com/embed/XCB4CAPI1JU?playlist=-J_Z-yHyTag,aWgaajiQUow&loop=1'}
                    allowFullScreen={true}
                />
            </div>
        );
    }
}

export default YouTube;