import React from "react";

//----------------IMPORT COMPONENTS------------------
  import HexCard from '../../components/HexCard/HexCard.js';
//----------------------END------------------

import "./HexMap.scss"


class HexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="HexMap-container"></div>;
  }
}

export default HexMap;
