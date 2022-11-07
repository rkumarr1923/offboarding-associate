import React from 'react';
import {Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className='page-not-found'>
        <p>Page not found, Please visit home page.</p><span className='anchor'><Link to="/">Home</Link></span>
    </div>
  );
}
