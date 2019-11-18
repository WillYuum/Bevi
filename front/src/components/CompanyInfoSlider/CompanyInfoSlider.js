import React from 'react';
import Slider from "react-slick";

import "./CompanyInfoSlider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * @prop {object} sliderData
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
        const { sliderData } = this.props
        return (
            <div className="companyDescription-container">
                <p>{sliderData.Description}</p>
            </div>
        )
    }
    //render companyDetails
    companyDetails = () => {
        const { sliderData } = this.props

        return (
            <div className="companyDetails-container">
                <ul className="list-container">

                    {sliderData.EmployeeSize ? <li> <p>Employee Size</p> <span>{sliderData.EmployeeSize}</span></li> : null}
                    {sliderData.Founded ? <li> <p> Founded </p><span>{sliderData.Founded}</span></li> : null}
                    {sliderData.Specialties ? <li> <p>Specialties </p> <span>{sliderData.Specialties}</span></li> : null}

                </ul>
            </div >
        )
    }

    clickHandler = (index) => {
        this.setState({ clickIndex: index })
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
        const indices = [{ index: 0, btnText: "Company Details" }, { index: 1, btnText: "Company Description" }];
        return (
            <div className="slider-container">
                <div className="btnArea-container">
                    {
                        indices.map((btnIfno, i) => {
                            return <Buttons key={i} btntext={btnIfno.btnText} clicked={i === this.state.slideIndex} onClick={() => { this.slider.slickGoTo(btnIfno.index) }} />
                        })
                    }
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

/**
 * @param {object} props
 */
const Buttons = (props) => {
    return (
        <div className={`btn1 btn-container ${props.clicked ? "active" : "notActive"}`}
            onClick={props.onClick} >
            <p>{props.btntext}</p>
        </div>
    )
}


export default CompanyInfoSlider;