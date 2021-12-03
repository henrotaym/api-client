const Request = require("../Request");
const { ApiResponse } = require("../responses");

/**
 * Error happening when a request fails.
 */
class RequestRelatedException extends Error
{
    /**
     * Instanciating request related error.
     * @param {string} message 
     */
    constructor(message = "Request failed.") {
        super(message)
        this.name = "RequestRelatedException";
        this.request = null;
        this.error = null;
        this.response = null;
    }

    /**
     * Setting related request.
     * @param {Request} request 
     * @returns {RequestRelatedException}
     */
    setRequest(request) {
        this.request = request;

        return this;
    }

    /**
     * Setting related response.
     * @param {ApiResponse} response 
     * @returns {RequestRelatedException}
     */
    setResponse(response) {
        this.response = response;

        return this;
    }

    /**
     * Setting related error.
     * @param {Error} request 
     * @returns {RequestRelatedException}
     */
    setError(error) {
        this.error = error;

        return this;
    }

    /**
     * Telling if this exception is having an error.
     * @returns {Boolean}
     */
    hasError() {
        return !!this.error;
    }

    /**
     * Getting exception context.
     */
    context() {
        return {
            response: this.response.toJson(),
            request: this.request.toJson(),
            error: this.error
        }
    }
}

module.exports = RequestRelatedException;