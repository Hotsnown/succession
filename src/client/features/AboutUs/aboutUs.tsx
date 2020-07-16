import React from 'react'
import './aboutUs.css'
{/* <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<!------ Include the above in your HEAD tag ---------->

<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'> */}

export const AboutUs = () => (
    <>
        <div className="image-aboutus-banner" style={{ marginTop: "70px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="lg-text">About Us</h1>
                        <p className="image-aboutus-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="aboutus-secktion paddingTB60">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="strong">Who we are and<br />what we do</h1>
                        <p className="lead">This is the world's leading portal for<br />easy and quick </p>
                    </div>
                    <div className="col-md-6">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viverra ante luctus vel. Donec vel mauris quam.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viverra ante luctus vel. Donec vel mauris quam. Lorem ipsum dolor sit amet. Nulla convallis egestas rhoncus.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container team-sektion paddingTB60">
            <div className="row">
                <div className="site-heading text-center">
                    <h3>Our Team</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua. Ut enim ad minim </p>
                    <div className="border"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 team-box">
                    <div className="team-img thumbnail">
                        <img src="https://images.pexels.com/photos/462680/pexels-photo-462680.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" />
                        <div className="team-content">
                            <h3>Philip Freeman</h3>
                            <div className="border-team"></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viverra ante luctus vel. Donec vel mauris quam.</p>
                            <div className="social-icons">
                                <a href="https://www.facebook.com/"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
                                <a href="https://twitter.com/"><i id="social-tw" className="fa fa-twitter-square fa-3x social"></i></a>
                                <a href="https://plus.google.com/"><i id="social-gp" className="fa fa-google-plus-square fa-3x social"></i></a>
                                <a href="mailto:bootsnipp@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 team-box">
                    <div className="team-img thumbnail">
                        <img src="https://images.pexels.com/photos/567459/pexels-photo-567459.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" />
                        <div className="team-content">
                            <h3>David Smith</h3>
                            <div className="border-team"></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viverra ante luctus vel. Donec vel mauris quam.</p>
                            <div className="social-icons">
                                <a href="https://www.facebook.com/"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
                                <a href="https://twitter.com/"><i id="social-tw" className="fa fa-twitter-square fa-3x social"></i></a>
                                <a href="https://plus.google.com/"><i id="social-gp" className="fa fa-google-plus-square fa-3x social"></i></a>
                                <a href="mailto:bootsnipp@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 team-box">
                    <div className="team-img thumbnail">
                        <img src="https://images.pexels.com/photos/325682/pexels-photo-325682.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" />
                        <div className="team-content">
                            <h3>Robert D'costa</h3>
                            <div className="border-team"></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viverra ante luctus vel. Donec vel mauris quam.</p>
                            <div className="social-icons">
                                <a href="https://www.facebook.com/"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
                                <a href="https://twitter.com/"><i id="social-tw" className="fa fa-twitter-square fa-3x social"></i></a>
                                <a href="https://plus.google.com/"><i id="social-gp" className="fa fa-google-plus-square fa-3x social"></i></a>
                                <a href="mailto:bootsnipp@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
)