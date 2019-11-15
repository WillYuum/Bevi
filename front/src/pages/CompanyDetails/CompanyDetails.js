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
                <div className="content">
                    <div className="company-Info">


                        <div className="companyMainInfo">
                            <div className="info-left">
                                <div className="LogoContainer">
                                    <HexCard CompanyName={companyInfo.CompanyName} />
                                </div>
                                <div className="companyInfo-titles">
                                    <h1>{companyInfo.CompanyName}</h1>
                                    <h2>{companyInfo.Type}</h2>
                                </div>
                            </div>
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

                        </div>

                        <div className="companySliderInfo-container">
                            <div className="button-slider">

                            </div>
                            <div className="slider-container">

                            </div>
                        </div>

                    </div>
                    <div className="related-companies">

                    </div>
                </div>
            </div>
        );
    }
}
export default CompanyDetails;

// <div className="companyHeroImage" style={{
//                     backgroundImage: `url("http://localhost:3001/hero_Images/${
//                         `${companyInfo.CompanyName}_heroImage.png`
//                         }")`
//                 }}>
//                     <div className="LogoContainer">
//                         <HexCard CompanyName={companyInfo.CompanyName} />
//                     </div>
//                 </div>
//                 <div className="content">
//                     <div className="CompanyIntro-container">
//                         <div className="CompanyIntro-left">
//                             <div className="companyMainInfo">
//                                 <h1>{companyInfo.CompanyName}</h1>
//                                 <h2>{companyInfo.Type}</h2>
//                             </div>
//                         </div>
//                         {
//                             companyInfo.CompanyWebLink ?
//                                 <a className="button-container" href={companyInfo.CompanyWebLink} target="_blank" rel="noopener noreferrer" >
//                                     <span className="text-btn">
//                                         Visit Website
//                             </span>
//                                 </a>
//                                 :
//                                 null
//                         }
//                     </div>
//                     <div className="bodyContent">
//                         <div className="additionalInfo-container">
//                             <ul className="list-conatiner">
//                                 {
//                                     companyInfo.CompanyEmployeeSize ?
//                                         <li>
//                                             <h3>Employee Size</h3><span>{companyInfo.CompanyEmployeeSize}</span>
//                                         </li>
//                                         :
//                                         null
//                                 }
//                                 {
//                                     companyInfo.Founded ?
//                                         <li>
//                                             <h3>Founded</h3><span>{companyInfo.Founded}</span>
//                                         </li>
//                                         :
//                                         null
//                                 }
//                                 {
//                                     companyInfo.Specialities ?
//                                         <li>
//                                             <h3>Specialities</h3><span>{companyInfo.Specialities}</span>
//                                         </li>
//                                         :
//                                         null
//                                 }
//                                 {
//                                     companyInfo.CompanySmallInfo ?
//                                         <li>
//                                             <h3>Brief Intro</h3><span>{companyInfo.CompanySmallInfo}</span>
//                                         </li>
//                                         :
//                                         null
//                                 }
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="description-container">
//                         <div className="companyDescription bodyInfoContainer">
//                             <h3>Company Descriptiom</h3>
//                             <p>{companyInfo.CompanyDescription}</p>
//                         </div>

//                         <div className="companyPost">
//                             {

//                             }
//                         </div>
//                     </div>
//                 </div>