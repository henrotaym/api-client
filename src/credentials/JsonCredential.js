const Credential = require("./Credential");

/**
 * Representing a JSON credential.
 */
class JsonCredential extends Credential
{
    /**
     * Preparing given request.
     * @param {Request} request
     * @returns {void}
     */
    prepare(request) {
        request.addHeaders({
            "X-Requested-With": "XMLHttpRequest" ,
            "Content-Type": "application/json"
        })
    }
}

module.exports = JsonCredential;