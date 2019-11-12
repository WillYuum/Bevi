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
            this.setState({ name: "ali" })
        } catch (err) {
            throw new Error(`fetching company with id = ${id} failed with = ${err} `)
        }
    }



    render() {
        const { companyInfo } = this.state
        return (
            <div className="CompanyDetails-container">
                <div className="companyHeroImage" style={{
                    backgroundImage: `url(\"http://localhost:3001/hero_Images/${
                        `${companyInfo.CompanyName}_heroImage.png`
                        }\")`
                }} ></div>
                <div className="header">
                    <div className="CompanyPrimaryContent">
                        <div className="LogoContainer">
                            <HexCard CompanyName={companyInfo.CompanyName} />
                        </div>
                        <div className="CompanyMainInfo">
                            <h2>{companyInfo.CompanyName}</h2>
                            <h3>{companyInfo.Type}</h3>
                        </div>
                    </div>
                    {
                        companyInfo.CompanyWebLink ? <div className="button-container">
                            <a className="visitWebsite-btn" href={companyInfo.CompanyWebLink} target="_blank" rel="noopener noreferrer">
                                <p>Visit Website</p>
                            </a>
                        </div> :
                            null
                    }

                </div>
            </div>
        );
    }
}

export default CompanyDetails;