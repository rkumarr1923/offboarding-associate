import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '../components/core';
import { tabSelected, appStore } from '../store';

export default function Offboarding() {
  const dispatch = useDispatch();
  const store = useSelector(appStore);
  const { activeTab, userDetails: user } = store || {};
  const isTabActive = (label: string) => (activeTab === label ? 'active-tab' : '');
  const tabClicked = (tab: string) => dispatch(tabSelected({ tab }));

  const loginFormRender = () => {
    return (
      <ul className="nav-links">
        {user &&
          (user.role === 'ROLE_ONBOARDING_REVIEWER' ||
            user.role === 'ROLE_ONBOARDING_MANAGER') && (
            <>
              <li className={isTabActive('NewUser')}>
                <Link to="/NewUser">
                  <Button
                    label="NewUser"
                    clickHandler={() => tabClicked('NewUser')}
                  />
                </Link>
              </li>
              <li className={isTabActive('Recordings')}>
                <Link to="/recording">
                  <Button
                    label="Recordings"
                    clickHandler={() => tabClicked('Recordings')}
                  />
                </Link>
              </li>
              <li className={isTabActive('Sample Documents')}>
                <Link to="/sampleDocuments">
                  <Button
                    label="Sample Documents"
                    clickHandler={() => tabClicked('Sample Documents')}
                  />
                </Link>
              </li>
              <li className={isTabActive('Upload Documents')}>
                <Link to="/uploadDocuments" state={{ forAssociate: { empId: user.empId } }}>
                  <Button
                    label="Upload Documents"
                    clickHandler={() => tabClicked('Upload Documents')}
                  />
                </Link>
              </li>
            </>
          )}
        {user && user.role === 'ROLE_ASSOCIATE' && (
          <>
            <li className={isTabActive('NewUser')}>
              <Link to="/NewUser">
                <Button
                  label="NewUser"
                  clickHandler={() => tabClicked('NewUser')}
                />
              </Link>
            </li>
            <li className={isTabActive('Sample Documents')}>
              <Link to="/sampleDocuments">
                <Button
                  label="Sample Documents"
                  clickHandler={() => tabClicked('Sample Documents')}
                />
              </Link>
            </li>
            <li className={isTabActive('Upload Documents')}>
              <Link to="/uploadDocuments" state={{ forAssociate: {} }}>
                <Button
                  label="Upload Documents"
                  clickHandler={() => tabClicked('Upload Documents')}
                />
              </Link>
            </li>
            <li className={isTabActive('Recordings')}>
              <Link to="/recording">
                <Button
                  label="Recordings"
                  clickHandler={() => tabClicked('Recordings')}
                />
              </Link>
            </li>
          </>
        )}
      </ul>
    );
  };

  return (
    <>
      <div className="onboarding-wrapper">
        <div className="onboarding-container">
          {user && loginFormRender()}
          <div className="onboarding-body">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
