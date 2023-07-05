import Banner1x from './images/banner@1x.webp';
import Banner2x from './images/banner@2x.webp';
import BannerPNG from './images/banner.png';
import happyCustomer from './images/Satisfied-Customers.png'
import consoleImage from './images/console.png'
import statisticInput from './images/statistics.png'
import React from 'react';
import './Home.css';

export default function Home() {
    return (
        <>
            <section className="block block--dark block--skewed-left hero">
                <div className="container grid grid--1x2" data-aos="fade-up">
                    <header className="block__header_hero hero__content">
                        <h1 className="block__heading">SpeakUp: Empowering Voices, Shaping Laws</h1>
                        <p className="hero__tagline">Be part of the change by participating in the legislative process!</p>

                        <a href="#" className="btn btn--accent btn--stretched">Get Started</a>
                    </header>
                    <picture>
                        <source
                            type="image/png"
                            srcSet={`${BannerPNG} 1x, ${BannerPNG} 2x`}
                        />
                        <img className="hero__image" src={Banner1x} alt="" />
                    </picture>
                </div>
            </section>
            <section className="block container block-domain" data-aos="fade-up">
                <header className="block__header">
                    <h2 className='darkmode-text'>Find Local Government Legislation</h2>
                    <p className='darkmode-text'>
                        Stay informed about local legislation being passed in any area across the United States. Our powerful search feature enables you to access information on bills, policies, budgets, and more, empowering you to stay engaged and make informed decisions.
                    </p>
                </header>
                <div className="input-group">
                    <input
                        type="text"
                        className="input"
                        placeholder="Enter a location..."
                    />
                    <button className="btn btn--accent">
                        Search
                    </button>
                </div>
                <ul className="list block-domain__prices">
                    <li>Bills</li>
                    <li>Policies</li>
                    <li>Budgets</li>
                    <li>And More..</li>
                </ul>
            </section>
            <section className="block container block-plans" data-aos="fade-up">
                <header className="block__header">
                    <h2 className='darkmode-text'>Enterprise Level Data & Data-Analysis</h2>
                    <p className='darkmode-text'>Looking for statistics or data analysis? We offer comprehensive plans tailored to meet your needs. Explore our packages and unlock the power of large data samples for informed decision-making.</p>
                </header>
                <div className="grid grid--1x3">
                    <div className="plan">
                        <div className="home-card card--secondary">
                            <header className="card__header">
                                <h3 className="plan__name">Basic Plan</h3>
                                <span className="plan__price">$0.70</span>
                                <span className="plan__billing--cycle">per MB</span>
                                <span className="plan__description">Access and analyze extensive datasets</span>
                            </header>
                            <div className="card__body">
                                <ul className="list list--tick">
                                    <li className="list__item">Large Data Extraction</li>
                                    <li className="list__item">Advanced Sampling Techniques</li>
                                    <li className="list__item">Data Cleansing</li>
                                    <li className="list__item">Export Data in Multiple Formats</li>
                                    <button className="btn btn--outline btn--block">Get Started</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="plan plan--popular">
                        <div className="home-card card--primary">
                            <header className="card__header">
                                <h3 className="plan__name">Advanced Plan</h3>
                                <span className="plan__price">$0.99</span>
                                <span className="plan__billing--cycle">per MB</span>
                                <span className="plan__description">Efficient extraction and analysis</span>
                            </header>
                            <div className="card__body">
                                <ul className="list list--tick">
                                    <li className="list__item">Comprehensive Data Extraction</li>
                                    <li className="list__item">Advanced Filtering Options</li>
                                    <li className="list__item">Automated Extraction Workflows</li>
                                    <li className="list__item">Data Integration with Existing Systems</li>
                                    <button className="btn btn--outline btn--block">Get Started</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="plan">
                        <div className="home-card card--secondary">
                            <header className="card__header">
                                <h3 className="plan__name">Premium Plan</h3>
                                <span className="plan__price">$1.20</span>
                                <span className="plan__billing--cycle">per MB</span>
                                <span className="plan__description">Deep insights and advanced analytics</span>
                            </header>
                            <div className="card__body">
                                <ul className="list list--tick">
                                    <li className="list__item">Full Data Sampling</li>
                                    <li className="list__item">Customized Sampling Algorithms</li>
                                    <li className="list__item">Predictive Analytics</li>
                                    <li className="list__item">Real-time Data Processing</li>
                                    <button className="btn btn--outline btn--block">Get Started</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="block container">
                <header className="block__header_premium" data-aos="fade">
                    <h2 className='darkmode-text home-text home-header' >Unlock Premium Insights with SpeakUp Plus</h2>
                    <p className='darkmode-text home-p'>
                        Upgrade to SpeakUp Plus, our premium subscription, and gain access to exclusive data and enhanced features. With SpeakUp Plus, you can delve deeper into legislative analysis, track bill progress, and have a greater impact on the laws that shape your community and beyond.
                    </p>
                </header>
                <article className="grid grid--1x2 feature">
                    <div className="feature__content" data-aos="fade-right">
                        <span className="icon-container">
                            <svg className="icon icon--primary">
                                {/* <use xlink: href="images/sprite.svg#easy"></use> */}
                            </svg>
                        </span>
                        <h3 className="feature__heading darkmode-text home-header">Comprehensive Data Analysis</h3>
                        <p className='darkmode-text  home-p'>
                            With SpeakUp Plus, you can access in-depth data analysis and visualize trends to gain valuable insights into legislative patterns and decision-making processes. Stay ahead of the game and make informed decisions with our premium features.
                        </p>
                        <a href="#" className="link-arrow">Learn more</a>
                    </div>
                </article>
                <article className="grid grid--1x2 feature">
                    <div className="feature__content" data-aos="fade-left">
                        <span className="icon-container">
                            <svg className="icon icon--primary">
                                {/* <use xlink: href="images/sprite.svg#computer"></use> */}
                            </svg>
                        </span>
                        <h3 className="feature__heading darkmode-text home-header" >Track and Engage</h3>
                        <p className='darkmode-text  home-p'>
                            Take your participation to the next level with SpeakUp Plus. Track the progress of bills, receive personalized alerts, and engage in direct communication with legislators. Your voice matters, and with our premium subscription, you can make a significant impact on the legislative process.
                        </p>
                        <a href="#" className="link-arrow">Learn more</a>
                    </div>
                    <picture data-aos="zoom-in-right">
                        <source
                            type="image/webp"
                            srcset="images/fast@1x.webp 1x, images/fast@2x.webp 2x"
                        />
                        <img className="feature__image" src="images/fast@1x.webp" alt="" />
                    </picture>
                </article>
            </section>

            <section className="block block--dark block--skewed-right block-showcase">
                <header className="block__header" data-aos="fade">
                    <h2>Effortless Access to Legislative Insights</h2>
                </header>
                <div className="container grid grid--1x2">
                    <picture data-aos="zoom-in-left">
                        <source
                            type="image/png"
                            srcSet={`${statisticInput} 1x`}
                        />
                        <img className="feature__image" src={statisticInput} alt="" />
                    </picture>

                    <ul className="list">
                        <li>
                            <div className="media" data-aos="fade-up">
                                <div className="media__image">
                                    <svg className="icon icon--primary">
                                        {/* <use href="images/sprite.svg#growth"></use> */}
                                    </svg>
                                </div>
                                <div className="media__body">
                                    <h3 className="media__title">Seamless Data Exploration</h3>
                                    <p>
                                        Discover a user-friendly control panel with SpeakUp that enables effortless exploration of statistics, voting patterns, and legislative details. Gain a deeper understanding of the legislative landscape and make informed decisions.
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="media" data-aos="fade-up">
                                <div className="media__image">
                                    <svg className="icon icon--primary">
                                        {/* <use href="images/sprite.svg#growth"></use> */}
                                    </svg>
                                </div>
                                <div className="media__body">
                                    <h3 className="media__title">Accessible Voting Process</h3>
                                    <p>
                                        Participate effortlessly in the democratic process with SpeakUp. Our intuitive platform allows you to easily cast your vote on proposed bills and legislation. Your voice matters, and we make sure it is heard and counted.
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="media" data-aos="fade-up">
                                <div className="media__image">
                                    <svg className="icon icon--primary">
                                        {/* <use href="images/sprite.svg#growth"></use> */}
                                    </svg>
                                </div>
                                <div className="media__body">
                                    <h3 className="media__title">Comprehensive Legislative Insights</h3>
                                    <p className='darkmode-text'>
                                        Gain comprehensive insights into the legislative process with SpeakUp. Stay informed about bills, policies, and regulations that impact your community and beyond. Make sense of complex legislation and contribute to meaningful discussions.
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="block">
                <header className="block__header" data-aos="fade">
                    <h2 className='darkmode-text'>What our customers are saying</h2>
                    <p className='darkmode-text'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi, sequi.
                    </p>
                </header>
                <div className="container" data-aos="fade-up">
                    <div className="home-card testimonial">
                        <div className="grid grid--1x2">
                            <div className="testimonial__image">
                                <picture data-aos="zoom-in-right">
                                    <source
                                        type="image/png"
                                        srcSet={`${happyCustomer} 1x`}
                                    />
                                    <img className="feature__image" src={happyCustomer} alt="" />
                                </picture>
                                <span className="icon-container icon-container--accent">
                                    <svg className="icon icon--white icon--small">
                                        {/* <use xlink: href="images/sprite.svg#quotes"></use> */}
                                    </svg>
                                </span>
                            </div>
                            <blockquote className="quote">
                                <p className="quote__text darkmode-text">
                                    The data was great thanks
                                </p>
                                <footer>
                                    <div className="media">
                                        <div className="media__image">
                                            <svg className="icon icon--primary quote__line">
                                                {/* <use xlink: href="images/sprite.svg#line"></use> */}
                                            </svg>
                                        </div>
                                        <div className="media__body">
                                            <h3 className="media__title quote__author darkmode-text">John Everyman</h3>
                                            <p className="quote__company darkmode-text" >Satisfied Customer</p>
                                        </div>
                                    </div>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container" data-aos="zoom-in">
                <div className="callout callout--primary">
                    <div className="grid grid--1x2">
                        <div className="callout__content">
                            <h2 className="callout__heading darkmode-text">Ready to get started?</h2>
                            <p className='darkmode-text'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dolor
                                eligendi rem ad totam quisquam rerum enim expedita earum quam.
                            </p>
                        </div>
                        <a className="btn btn--secondary btn--stretched" href="#">Get Started!</a>
                    </div>
                </div>
            </div>

            <footer className="block block--dark footer">
                <div className="container grid footer__sections">
                    <section className="collapsible collapsible--expanded footer_section">
                        <div className="collapsible__header">
                            <h2 className="collapsible__heading footer__heading">alpha</h2>
                            <svg className="icon icon--grey collapsible__chevron">
                                {/* <use xlink: href="images/sprite.svg#line"></use> */}
                            </svg>
                        </div>
                        <div className="collapsible__content">
                            <ul className="list">
                                <li><a href="#">SQL</a></li>
                                <li><a href="#">HTML CSS JS</a></li>
                                <li><a href="#">.NET</a></li>
                                <li><a href="#">PYTHON</a></li>
                            </ul>
                        </div>
                    </section>
                    <section className="collapsible footer_section">
                        <div className="collapsible__header">
                            <h2 className="collapsible__heading footer__heading">Beta</h2>
                            <svg className="icon icon--grey collapsible__chevron">
                                {/* <use xlink: href="images/sprite.svg#line"></use> */}
                            </svg>
                        </div>
                        <div className="collapsible__content">
                            <ul className="list">
                                <li><a href="#">SQL</a></li>
                                <li><a href="#">HTML CSS JS</a></li>
                                <li><a href="#">.NET</a></li>
                                <li><a href="#">PYTHON</a></li>
                            </ul>
                        </div>
                    </section>
                    <section className="collapsible footer_section">
                        <div className="collapsible__header">
                            <h2 className="collapsible__heading footer__heading">omega</h2>
                            <svg className="icon icon--grey collapsible__chevron">
                                {/* <use xlink: href="images/sprite.svg#line"></use> */}
                            </svg>
                        </div>
                        <div className="collapsible__content">
                            <ul className="list">
                                <li><a href="#">SQL</a></li>
                                <li><a href="#">HTML CSS JS</a></li>
                                <li><a href="#">.NET</a></li>
                                <li><a href="#">PYTHON</a></li>
                            </ul>
                        </div>
                    </section>
                    <div className="footer__brand">
                        <img src="images/logo.svg" alt="" />
                        <p className="footer__copyright">Copyright 2023 DoubleKing</p>
                    </div>
                </div>
            </footer>
        </>
    );

}