
import { CustomerDetails } from "./customerdetails";
import { ResponseModel } from "./responseModel";

export interface CustomerResponseModel extends ResponseModel{
    data:CustomerDetails[];
}