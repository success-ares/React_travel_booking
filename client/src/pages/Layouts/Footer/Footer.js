import React, {Component} from 'react';

class Footer extends Component {

    render(){
        return(
            
                <footer className="footer-area section-gap">
                        <div className="container">

                            <div className="row">
                                <div className="col-lg-3  col-md-6 col-sm-6">
                                    <div className="single-footer-widget">
                                        <h6>About Agency</h6>
                                        <p>
                                            CarFly Online Travel Agency <p>June - 2019</p>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="single-footer-widget">
                                        <h6>Navigation Links</h6>
                                        <div className="row">
                                            <div className="col">
                                                <ul>
                                                    <li><a href="#">Home</a></li>

                                                </ul>
                                            </div>
                                            <div className="col">
                                                <ul>

                                                    <li><a href="#">Contact</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3  col-md-6 col-sm-6">
                                    <div className="single-footer-widget">
                                        <h6>Newsletter</h6>
                                        <p>
                                            Under test
                                        </p>
                                        <div id="mc_embed_signup">
                                            <form target="_blank"
                                                action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                                                method="get" className="subscription relative">
                                                <div className="input-group d-flex flex-row">
                                                    <input name="EMAIL" placeholder="Email Address" 
                                                     type="email"/>
                                                    <button className="btn bb-btn"><span className="lnr lnr-location"></span></button>
                                                </div>
                                                <div className="mt-10 info"></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3  col-md-6 col-sm-6">
                                    <div className="single-footer-widget mail-chimp">
                                        <h6 className="mb-20">InstaFeed</h6>
                                        <ul className="instafeed d-flex flex-wrap">
                                            <li><img src="img/i1.jpg" alt=""/></li>
                                            <li><img src="img/i2.jpg" alt=""/></li>
                                            <li><img src="img/i3.jpg" alt=""/></li>
                                            <li><img src="img/i4.jpg" alt=""/></li>
                                            <li><img src="img/i5.jpg" alt=""/></li>
                                            <li><img src="img/i6.jpg" alt=""/></li>
                                            <li><img src="img/i7.jpg" alt=""/></li>
                                            <li><img src="img/i8.jpg" alt=""/></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                        </div>
    </footer>
        )
    }
}

export default Footer;