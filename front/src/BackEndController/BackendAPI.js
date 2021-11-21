import { CallReadAPI } from "./BackendModal";

function GetCompanyData(cb) {
    CallReadAPI('/companies', cb);
}


function GetCompanyTypes(cb) {
    CallReadAPI('/companies/types', cb);
}


function GetCompaniesTypeById(id, cb) {
    CallReadAPI(`/companies/type/${id}`, cb);
}

export {
    GetCompanyData,
    GetCompanyTypes,
    GetCompaniesTypeById
};

