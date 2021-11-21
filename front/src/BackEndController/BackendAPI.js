import { CallReadAPI } from "./BackendModal";

function GetCompanyData(cb) {
    CallReadAPI('/companies', cb);
}


function GetCompanyTypes(cb) {
    CallReadAPI('/companies/types', cb);
}

export {
    GetCompanyData,
    GetCompanyTypes
};

