import React from 'react'
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer className='app-footer'>
            <div className="ds-row ds-offset-xs-1 ds-offset-sm-0_5 ds-pad-t-b-xs-1 ds-pad-t-b-md-2">
                <div className="ds-pull-1 ds-col-lg-2 ds-col-md-2 ds-display-md-inline ds-hide-xs">
                    <img src="https://w3id-ns.sso.ibm.com/static/img/ibm.svg" alt="IBM Logo" /><img src="https://w3id-ns.sso.ibm.com/static/img/c.svg" alt="IBM Logo" />
                </div>
            </div>
        </footer>
    )
}

export default Footer;