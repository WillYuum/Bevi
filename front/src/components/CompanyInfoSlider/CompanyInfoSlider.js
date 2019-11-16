import React from 'react';
import Slider from "react-slick";

import "./CompanyInfoSlider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * @prop {object} CompanyInfo
 */
class CompanyInfoSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        }
    }



    //render companyDescription
    companyDescription = () => {
        const { CompanyInfo } = this.props
        return (
            <div className="companyDescription-container">
                <p>{CompanyInfo}</p>
            </div>
        )
    }
    //render companyDetails
    companyDetails = () => {
        return (
            <div>
                <ul>
                    <li>Employee Size</li>
                    <li>Founded</li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        )
    }

    render() {
        const SliderSettings = {
            dots: false,
            infinite: false,
            arrows: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: (current, next) => this.setState({ slideIndex: next })
        }
        return (

            <div className="slider-container">
                <div className="btnArea-container">
                    <ul className="btns-container">
                        <li>
                            <div className="btn-container" onClick={() => { this.slider.slickGoTo(0) }}>
                                <p>CompanyDetails</p>
                            </div>
                        </li>
                        <li>
                            <div className="btn-container" onClick={() => { this.slider.slickGoTo(1) }}>
                                <p>Company Description</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <Slider ref={slider => (this.slider = slider)} {...SliderSettings}>
                    {
                        this.companyDetails()
                    }
                    {
                        this.companyDescription()
                    }
                </Slider>
            </div>
        );
    }
}

export default CompanyInfoSlider;