const { trying } = require("@henrotaym/helpers");
const { TryGettingApiResponse, ApiResponse } = require("./responses");
const { Credential } = require("./credentials");
const Request = require("./Request");

/**
 * Representing a client performing API requests.
 */
class Client
{
    /**
     * Instanciating client.
     * @param {Credential|null} credential 
     */
    constructor(credential)
    {
        this.credential = credential;
    }

    /**
     * Setting linked credential.
     * @param {Credential} credential 
     * @returns {Client}
     */
    setCredential(credential)
    {
        this.credential = credential

        return this;
    }

    /**
     * Trying to make given request.
     * @param {Request} request 
     * @returns {Promise<TryGettingApiResponse>}
     */
    async try(request)
    {
        if (this.credential) {
            this.credential.prepare(request);
        }

        const response = new TryGettingApiResponse()
        response.setRequest(request);

        const [error, fetch_response] = await trying(() => fetch(request.getUrl(), request.toFetchParams()));
        
        if (error) {
            response.setError(error);
            return response;
        }

        return await response.setResponse(new ApiResponse(fetch_response));
    }
}

module.exports = Client;