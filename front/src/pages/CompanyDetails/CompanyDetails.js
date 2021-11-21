import React from 'react';


import { shuffleCompanies } from "../../utils/shuffleCompanies.js"
import { GetCompanyById, GetRelatedCompanyByType } from "../../BackEndController/BackendAPI.js";

//----------------IMPORT COMPONENTS------------------
import HexCard from "../../components/HexCard/HexCard.js";
import CompanyInfoSlider from "../../components/CompanyInfoSlider/CompanyInfoSlider.js";
import HexMap from '../../map-component/HexMap/HexMap.js';
//----------------IMPORT COMPONENTS------------------

import "./CompanyDetails.scss";

class CompanyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInfo: "",
            relatedCompanies: [],
        }
    }


    async componentDidMount() {
        const { ...props } = this.props
        const id = props.match.params.id;
        GetCompanyById(id, this.OnRecieveCompanyData);

        const relatedTypeId = this.state.companyInfo.CompanytypeId;
        GetRelatedCompanyByType(relatedTypeId, this.OnRecieveRelatedCompanyByType)
    }

    async componentWillReceiveProps(newProps) {

        const id = newProps.match.params.id;
        GetCompanyById(id, this.OnRecieveCompanyData);

        const relatedTypeId = this.state.companyInfo.CompanytypeId;
        GetRelatedCompanyByType(relatedTypeId, this.OnRecieveRelatedCompanyByType)
    }

    OnRecieveCompanyData = (data) => {
        this.setState({ companyInfo: data.Company[0] });
    }

    OnRecieveRelatedCompanyByType = (data) => {
        const shuffledRelatedCompanies = shuffleCompanies(data.Companies)
        this.setState({ relatedCompanies: shuffledRelatedCompanies })
    }


    render() {
        const { companyInfo, relatedCompanies } = this.state

        return (
            <div className="CompanyDetails-container">
                <div className="leftInfo">


                    <div className="TopInfo-container">
                        <div className="logoContainer">
                            <HexCard CompanyName={companyInfo.CompanyName} />
                        </div>
                        <div className="companyTitles">
                            <h1>{companyInfo.CompanyName}</h1>
                            <h2>{companyInfo.Type}</h2>
                        </div>
                    </div>


                    <div className="companyDetails">
                        <h3>Company Details</h3>
                        <ul>
                            <li><p>Employee Size: </p> <span>{companyInfo.CompanyEmployeeSize}</span></li>
                            <li><p>Founded:</p> <span>{companyInfo.Founded}</span></li>
                        </ul>
                    </div>


                </div>
                <div className="middleInfo">
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

                    <div className="specialities-container">
                        <h3>Company Specialities</h3>
                        <p>{companyInfo.Specialities}</p>
                    </div>

                    <div className="companyDescription-container">
                        <h3>Company Description</h3>
                        <div className="description-container">
                            <p>{companyInfo.CompanyDescription}</p>
                        </div>
                    </div>
                </div>
                <div className="relatedCompanies-container">
                    <h3>Related Companies</h3>
                    <HexMap CompanyData={relatedCompanies} colSize="2" hexAmount="12" />
                </div>
            </div>
        );
    }
}
export default CompanyDetails;