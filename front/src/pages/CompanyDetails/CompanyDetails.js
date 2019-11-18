import React from 'react';
import { shuffleCompanies } from "../../utils/shuffleCompanies.js"

//----------------IMPORT COMPONENTS------------------
import HexCard from "../../components/HexCard/HexCard.js";
import CompanyInfoSlider from "../../components/CompanyInfoSlider/CompanyInfoSlider.js";
import hexMap from "../../map-component/HexMap/HexMap.js"
//----------------IMPORT COMPONENTS------------------

import "./CompanyDetails.scss"
import HexMap from '../../map-component/HexMap/HexMap.js';



class CompanyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInfo: "",
            relatedCompanies: [],
        }
    }

    // storing backend Url in readable variable
    Back_Url = process.env.REACT_APP_BEVY_API;

    async componentDidMount() {
        const { ...props } = this.props
        const id = props.match.params.id;
        await this.getCompanyById(id)

        const relatedTypeId = this.state.companyInfo.CompanytypeId;
        await this.getRelatedCompaniesById(relatedTypeId)
    }

    async componentWillReceiveProps(newProps) {
       
        const id = newProps.match.params.id;
        await this.getCompanyById(id)

        const relatedTypeId = this.state.companyInfo.CompanytypeId;
        await this.getRelatedCompaniesById(relatedTypeId)
    }
    /**
     * @function getCompanyById get the company info 
     * @param {int} id
     */
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
    /**
     * @function getRelatedCompaniesById - get companies depending the id recieved in companyDetails
     * @param {int} id
     */
    getRelatedCompaniesById = async (id) => {
        try {
            const req = await fetch(`${this.Back_Url}/companies/type/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })

            const result = await req.json();
            const shuffledRelatedCompanies = await shuffleCompanies(result.Companies)
            this.setState({ relatedCompanies: shuffledRelatedCompanies })
        } catch (err) {
            throw new Error(`Getting related companies failed with = ${err}`)
        }
    }

    render() {
        const { companyInfo, relatedCompanies } = this.state

        // data to be sent to CompanyInfoSlider component
        const SliderData = {
            Description: companyInfo.CompanyDescription,
            EmployeeSize: companyInfo.CompanyEmployeeSize,
            Founded: companyInfo.Founded,
            Specialties: companyInfo.Specialities
        }
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
                            <CompanyInfoSlider sliderData={SliderData} />
                        </div>
                    </div>


                    <div className="related-companies">
                        <HexMap CompanyData={relatedCompanies} hexAmount="10" colSize="2" />
                    </div>


                </div>
            </div>
        );
    }
}
export default CompanyDetails;