import React from 'react';

//----------------IMPORT COMPONENTS------------------
import HexCard from "../../components/HexCard/HexCard.js"
//----------------IMPORT COMPONENTS------------------

import "./CompanyDetails.scss"

class CompanyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInfo: "",
        }
    }

    // storing backend Url in readable variable
    Back_Url = process.env.REACT_APP_BEVY_API;

    async componentDidMount() {
        const { ...props } = this.props
        const id = props.match.params.id;
        await this.getCompanyById(id)
    }

    getCompanyById = async (id) => {
        try {
            const req = await fetch(`${this.Back_Url}/company/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })

            const result = await req.json();
            this.setState({ companyInfo: result.Company[0] })
            console.log(this.state.companyInfo)
        } catch (err) {
            throw new Error(`fetching company with id = ${id} failed with = ${err} `)
        }
    }

    render() {
        const { companyInfo } = this.state
        console.log(companyInfo.CompanyDescription)
        return (
            <div className="CompanyDetails-container">
                <div className="companyHeroImage" style={{
                    backgroundImage: `url("http://localhost:3001/hero_Images/${
                        `${companyInfo.CompanyName}_heroImage.png`
                        }")`
                }}>
                    <div className="LogoContainer">
                        <HexCard CompanyName={companyInfo.CompanyName} />
                    </div>
                </div>
                <div className="content">
                    <div className="CompanyIntro-container">
                        <div className="CompanyIntro-left">
                            <div className="companyMainInfo">
                                <h2>{companyInfo.CompanyName}</h2>
                                <h3>{companyInfo.Type}</h3>
                            </div>
                        </div>
                        {/* <div className="CompanyIntro-right"> */}
                        {
                            companyInfo.CompanyWebLink ?
                                <a className="button-container" href={companyInfo.CompanyWebLink} target="_blank" rel="noopener noreferrer" >
                                    <span className="text-btn">
                                        Visit Website
                            </span>
                                </a>
                                :
                                null
                        }
                        {/* </div> */}
                    </div>
                    <div className="bodyContent">
                        {
                            companyInfo.CompanySmallInfo ?
                                <div className="briefInfo bodyInfoContainer">
                                    <h4>Brief Intro</h4>
                                    <p>{companyInfo.CompanySmallInfo}</p>
                                </div>
                                :
                                null
                        }
                        <div className="companyDescription bodyInfoContainer">
                            <h4>Company Descriptiom</h4>
                            <p>{companyInfo.CompanyDescription}</p>
                        </div>
                    </div>
                    <div className="footerContent">
                        <div className="additionalInfo-container">
                            <ul className="list-conatiner">
                                {
                                    companyInfo.CompanyEmployeeSize ?
                                        <li>
                                            Employee Size:<span>{companyInfo.CompanyEmployeeSize}</span>
                                        </li>
                                        :
                                        null
                                }
                                {
                                    companyInfo.Founded ?
                                        <li>
                                            Founded:<span>{companyInfo.Founded}</span>
                                        </li>
                                        :
                                        null
                                }
                                {
                                    companyInfo.Specialities ?
                                        <li>
                                            Specialities:<span>{companyInfo.Specialities}</span>
                                        </li>
                                        :
                                        null
                                }
                            </ul>
                        </div>
                        <div className="companyPost">
                            {

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CompanyDetails;