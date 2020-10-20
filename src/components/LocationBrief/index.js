import React, { Component } from 'react';
import './styles.scss';


class LocationBrief extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            redirect: '',
            ready: false,
            visible: false,
            wrapperReady: false,

            content: props.content
        };
    }

    componentDidMount() {
        this.setState({ wrapperReady: true });

        const sleep = ms => (new Promise((resolve, reject) => setTimeout(() => resolve(), ms)));

        (async () => {
            this.setState({ visible: true, ...this.state.content });
            await sleep(2000);

            this.setState({ ready: true, ...this.state.content });
        })();
    }

    componentWillUnmount() {
        this.setState({ wrapperReady: false });
    }

    render() {
        return (
            <div className={`LocBrief-wrapper ${(this.state.wrapperReady) ? 'ready' : ''}`}>
                <div className={`LocBrief-sidebar ${(this.state.ready) ? 'ready' : ''} ${(this.state.visible) ? 'visible' : ''}`} >
                    <div className="LocBrief-sidebar-banner">
                        <span>
                            {this.state.content.header}
                            <br/>
                            <span className='LocBrief-loading-text'>{this.state.content.subheader}</span>
                        </span>
                    </div>
                    <div className="LocBrief-sidebar-desc">
                        <span>
                            {this.state.content.description}
                        </span>
                    </div>
                    {/* <div className="LocBrief-loading-anim">
                        <CircularProgress size='50px' thickness={5} style={{color: '#AFAFAF'}}/>
                    </div> */}

                    {/* <div className='LocBrief-info-panel'>
                        
                        <div className="LocBrief-info-panel-wrapper">
                            {
                                Object.keys(this.state.sidebar).map((key, x) => {
                                    const item = this.state.sidebar[key];
                                    return (
                                        <div key={x} className="LocBrief-info-item">
                                            <div className="LocBrief-info-label">
                                                <div className="LocBrief-info-icon">
                                                    {item.icon}
                                                </div>
                                                <div className="LocBrief-info-label">
                                                    {item.label}
                                                </div>
                                            </div>
                                            <div className="LocBrief-info-value">
                                                {item.val}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default LocationBrief
