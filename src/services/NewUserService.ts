import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const BASE_URL = 'http://localhost:9099/';
const ASSO_BASE_URL = 'http://localhost:9092/';

export const saveNewUser = (requestData: any, userToken: string) => {
    return axios.post(`${BASE_URL}user_add`, requestData)
        .then((response) => {
            console.log("response is ::::: >>>>" + JSON.stringify(response));
            // setSnakBarOpen(true);

            if (response.data.role.name === 'ROLE_ASSOCIATE') {
                const saveAssociateReq = {
                    associateName: response.data.userName,
                    ibmId: response.data.employeeId,
                    emailIbm: response.data.email,
                    FristName: response.data.FristName,
                    LastName: response.data.LastName,
                    activeInactive: 'Yet to be started',
                };
                const associateResponse = axios.post(
                    'http://localhost:9092/pru-associate/new-associate',
                    saveAssociateReq,
                    {
                        headers: { Authorization: 'Bearer ' + userToken },
                    }
                );
                console.log("associateResponse ::: >>>" + JSON.stringify(associateResponse));
            }
            // setSnackbarOpen(true);
            // dispatch(resetCreateNewUserDetails());
        });
}

class NewUserService {

    // saveNewUser = (requestData: any, userToken: string) => {
    //     return axios.post(`${BASE_URL}user_add`, requestData)
    //         .then((response) => {
    //             console.log("response is ::::: >>>>" + JSON.stringify(response));
    //             // setSnakBarOpen(true);

    //             if (response.data.role.name === 'ROLE_ASSOCIATE') {
    //                 const saveAssociateReq = {
    //                     associateName: response.data.userName,
    //                     ibmId: response.data.employeeId,
    //                     emailIbm: response.data.email,
    //                     FristName: response.data.FristName,
    //                     LastName: response.data.LastName,
    //                     activeInactive: 'Yet to be started',
    //                 };
    //                 const associateResponse = axios.post(
    //                     'http://localhost:9092/pru-associate/new-associate',
    //                     saveAssociateReq,
    //                     {
    //                         headers: { Authorization: 'Bearer ' + userToken },
    //                     }
    //                 );
    //                 console.log("associateResponse ::: >>>" + JSON.stringify(associateResponse));
    //             }
    //             // setSnackbarOpen(true);
    //             // dispatch(resetCreateNewUserDetails());
    //         });
    // }

    // getRecordings() {
    //     return axios.get(BASE_URL + '/get-all-recordings');
    // }

    // createRecording(recording, headers) {
    //     return axios.post(BASE_URL + '/add-recording', recording, {
    //         headers: headers,
    //     });
    // }

    // getRecordingById(recordingId) {
    //     return axios.get(BASE_URL + '/' + recordingId);
    // }

    // updateRecording(recording, recordingId, headers) {
    //     return axios.put(BASE_URL + '/' + recordingId, recording, {
    //         headers: headers,
    //     });
    // }

    // deleteRecording(recordingId, headers) {
    //     return axios.delete(BASE_URL + '/' + recordingId, {
    //         headers: headers,
    //     });
    // }
}

export default new NewUserService();
