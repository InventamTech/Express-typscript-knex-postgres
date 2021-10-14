
export function responseGenerators(responseData?:object, responseStatusCode?:number, responseStatusMsg?:string, responseErrors?:boolean, token?:string,refreshToken?:string) {
        const responseJson = {}
        responseJson['data'] = responseData
        responseJson['status_code'] = responseStatusCode
        responseJson['status_message'] = responseStatusMsg
            // errors
        if (responseErrors === undefined) {
            responseJson['response_error'] = []
        } else {
            responseJson['response_error'] = responseErrors
        }
        // token
        if (token !== undefined && refreshToken !== undefined) {
            responseJson['token'] = token
            responseJson['refreshToken'] = refreshToken
        }
        return responseJson
}

export function logDateFormat() {
    return "DD-MM-YYYY";
}
