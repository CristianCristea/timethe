import React from 'react';
import './LoadingPage.css';

const LoadingPage = () => (
  <section className="LoadingPage">
    <img className="LoadingPage__image" src={`${process.env.PUBLIC_URL}/images/loader.gif`} alt="loading app" />
  </section>
);

export default LoadingPage;
