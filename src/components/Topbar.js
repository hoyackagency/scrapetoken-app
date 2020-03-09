// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LanguageDropdown from './LanguageDropdown';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import { showRightSidebar } from '../redux/actions';

import profilePic from '../assets/images/users/avatar-1.jpg';
import logoSm from '../assets/images/logo_sm.png';
import logo from '../assets/images/logo-light.png';

const Notifications = [
    {
        id: 1,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary',
    },
    {
        id: 2,
        text: 'New user registered.',
        subText: '5 min ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'info',
    },
    {
        id: 3,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'success',
    },
    {
        id: 4,
        text: 'Caleb Flakelar commented on Admin',
        subText: '2 days ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'danger',
    },
    {
        id: 5,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary',
    },
    {
        id: 6,
        text: 'New user registered.',
        subText: '5 min ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'info',
    },
    {
        id: 7,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'success',
    },
    {
        id: 8,
        text: 'Caleb Flakelar commented on Admin',
        subText: '2 days ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'danger',
    },
];

const ProfileMenus = [
    {
        label: 'My Account',
        icon: 'mdi mdi-account-circle',
        redirectTo: '/',
    },
    {
        label: 'Settings',
        icon: 'mdi mdi-account-edit',
        redirectTo: '/',
    },
    {
        label: 'Support',
        icon: 'mdi mdi-lifebuoy',
        redirectTo: '/',
    },
    {
        label: 'Lock Screen',
        icon: 'mdi mdi-lock-outline',
        redirectTo: '/',
    },
    {
        label: 'Logout',
        icon: 'mdi mdi-logout',
        redirectTo: '/account/logout',
    },
];

type TopbarProps = {
    showRightSidebar: PropTypes.func,
    hideLogo?: boolean,
    navCssClasses?: string,
    openLeftMenuCallBack?: PropTypes.func,
};

class Topbar extends Component<TopbarProps> {
    constructor(props) {
        super(props);

        this.handleRightSideBar = this.handleRightSideBar.bind(this);
    }

    /**
     * Toggles the right sidebar
     */
    handleRightSideBar = () => {
        this.props.showRightSidebar();
    };

    render() {
        const hideLogo = this.props.hideLogo || false;
        const navCssClasses = this.props.navCssClasses || '';
        const containerCssClasses = !hideLogo ? 'container-fluid' : '';
        return (
            <React.Fragment>
                <div className={`navbar-custom ${navCssClasses}`}>
                    <div className={containerCssClasses}>
                        {!hideLogo && (
                            <Link to="/" className="topnav-logo">
                                <span className="topnav-logo-lg">
                                    <img src={logo} alt="logo" height="16" />
                                </span>
                                <span className="topnav-logo-sm">
                                    <img src={logoSm} alt="logo" height="16" />
                                </span>
                            </Link>
                        )}

                        <ul className="list-unstyled topbar-right-menu float-right mb-0">
                            <li className="notification-list topbar-dropdown">
                                <button
                                    className="nav-link dropdown-toggle arrow-none btn btn-link"
                                    onClick={this.handleRightSideBar}>
                                    <i className="dripicons-gear noti-icon"></i>
                                </button>
                            </li>
                            <li className="notification-list topbar-dropdown d-none d-lg-block">
                                <LanguageDropdown />
                            </li>
                            <li className="notification-list">
                                <NotificationDropdown notifications={Notifications} />
                            </li>
                            <li className="notification-list">
                                <ProfileDropdown
                                    profilePic={profilePic}
                                    menuItems={ProfileMenus}
                                    username={'Dominic Keller'}
                                    userTitle={'Founder'}
                                />
                            </li>
                        </ul>

                        <button
                            className="button-menu-mobile open-left disable-btn"
                            onClick={this.props.openLeftMenuCallBack}>
                            <i className="mdi mdi-menu"></i>
                        </button>

                        <div className="app-search">
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search..." />
                                    <span className="mdi mdi-magnify"></span>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="submit">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(
    null,
    { showRightSidebar }
)(Topbar);
