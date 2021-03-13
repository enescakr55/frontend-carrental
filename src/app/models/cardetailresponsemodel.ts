import { CarDetail } from "./cardetail";
import { ResponseModel } from "./responseModel";

export interface CarDetailResponseModel extends ResponseModel{
    data:CarDetail[];

}