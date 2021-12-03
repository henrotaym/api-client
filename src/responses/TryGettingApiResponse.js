const { RequestRelatedException } = require("../exceptions");
const ApiResponse = require("./ApiResponse");
const Request = require("../Request");

/**
 * Trying to get api response from current request.
 */
class TryGettingApiResponse
{
    /**
     * Instanciating class
     * @param {String} exception_message Exception message in case of failure.
     */
    constructor(exception_message)
    {
        this.exception = new RequestRelatedException(exception_message);
        this.response = null;
    }

    /**
     * Setting error to exception.
     * @param {Error} error 
     * @returns {TryGettingApiResponse}
     */
    setError(error)
    {
        this.exception.setError(error);

        return this;
    }

    /**
     * Setting request to exception.
     * @param {Request} request 
     * @returns {TryGettingApiResponse}
     */
    setRequest(request)
    {
        this.exception.setRequest(request);

        return this;
    }

    /**
     * Setting response.
     * @param {ApiResponse} response 
     * @returns {Promise<TryGettingApiResponse>}
     */
    async setResponse(response)
    {
        this.response = response;
        await this.response.getBody();
        this.exception.setResponse(this.response);

        return this;
    }

    /**
     * Telling if response failed
     * @returns {Boolean}
     */
    failed() {
        return !!(this.exception.hasError() || !this.response.ok());
    }

    /**
     * Telling if request was successfull.
     * @returns {Boolean}
     */
    ok() {
        return !this.failed();
    }

    /**
     * Getting response body.
     * @returns {any}
     */
    get() {
        return this.response?.get();
    }

    /**
     * Getting underlying response.
     * @returns {Response|null}
     */
    getResponse() {
        return this.response;
    }

    /**
     * Getting exception
     * @returns {RequestRelatedException}
     */
    getException() {
        return this.exception;
    }
}

module.exports = TryGettingApiResponse;