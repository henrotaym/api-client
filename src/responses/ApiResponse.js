const { trying } = require('@henrotaym/helpers');

/**
 * Representing response from API.
 */
class ApiResponse
{
    /**
     * Creating response from a fetch APi response.
     * @param {Response} fetch_response 
     */
    constructor(fetch_response)
    {
        this.fetch_response = fetch_response;
        this.body = undefined;
    }

    /**
     * Telling if response can be considered as success.
     * @returns {Boolean}
     */
    ok() {
        return this.fetch_response.ok;
    }

    /**
     * Response status code.
     * @returns {Number}
     */
    status() {
        return this.fetch_response.status;
    }
    
    /**
     * Setting and getting response body.
     * @returns {Promise<any>}
     */
    async getBody() {
        if (this.body !== undefined) {
            return this.body;
        }

        const [, json] = await trying(() => this.fetch_response.json());
        return this.body = json ?? null;
    }

    /**
     * Getting response body.
     * @returns {any}
     */
    get() {
        return this.body;
    }

    /**
     * Transforming request to json.
     */
    toJson() {
        return {
            ok: this.ok(),
            status: this.status(),
            body: this.get()
        }
    }
}

module.exports = ApiResponse;