/**
 * Representing an API request.
 */
class Request
{
    /**
     * Initializing underlying parameters.
     */
    constructor()
    {
        this.base_url = "";
        this.url = null;
        this.verb = "GET";
        this.data = {};
        this.query = {};
        this.headers = {};
        this.with_credentials = false;
    }

    /**
     * Setting request verb.
     * @param {string} verb Request verb
     * @returns {Request}
     */
    setVerb(verb)
    {
        this.verb = verb;

        return this;
    }

    /**
     * Setting url.
     * @param {string} url 
     * @returns {Request}
     */
    setUrl(url)
    {
        const query_index = url.indexOf("?");
        
        if (query_index === -1) {
            this.url = url;

            return this;
        }

        this.url = url.substr(0, query_index);
        const query = [ ...url.substr(query_index).entries()].reduce((query, [name, value]) => ({ ...query,  [name]: value }), {})

        return this.addQuery(query);
    }

    /**
     * Setting base_url used by this request.
     * @param {string} base_url 
     * @returns {Request}
     */
    setBaseUrl(base_url)
    {
        this.base_url = base_url;

        return this;
    }

    /**
     * Adding data to request.
     * @param {Object} data 
     * @returns {Request}
     */
    addData(data)
    {
        this.data = { ...this.data, ...data };

        return this;
    }

    /**
     * Adding query to request.
     * @param {Object} query 
     * @returns {Request}
     */
    addQuery(query)
    {
        this.query = { ...this.query, ...query };

        return this;
    }

    /**
     * Adding headers to request.
     * @param {Object} headers 
     * @returns {Request}
     */
    addHeaders(headers)
    {
        this.headers = { ...this.headers, ...headers };

        return this;
    }

    /**
     * Telling if request should add cookies.
     * @param {Boolean} is_having_credentials 
     * @returns {Request}
     */
    withCredentials(is_having_credentials)
    {
        this.with_credentials = is_having_credentials;

        return this;
    }

    /**
     * Telling if request is having query.
     * @returns {Boolean}
     */
    havingQuery()
    {
        return !this.isEmpty(this.query);
    }

    /**
     * Telling if request is having data.
     * @returns {Boolean}
     */
    havingData()
    {
        return !this.isEmpty(this.data);
    }

    /**
     * Telling if request should send cookies.
     * @returns {Boolean}
     */
    havingCredentials()
    {
        return this.with_credentials;
    }

    /**
     * Telling if request is having headers.
     * @returns {Boolean}
     */
    havingHeaders()
    {
        return !this.isEmpty(this.headers);
    }

    /**
     * Telling if given object is empty.
     * @param {Object} object 
     * @returns {Boolean}
     */
    isEmpty(object)
    {
        return Object.keys(object).length === 0;
    }

    /**
     * Transforming request to fetch API requests parameters.
     * @returns {Object}
     */
    toFetchParams()
    {
        const params =  { method: this.verb }

        if (this.havingData()) {
            params.body = JSON.stringify(this.data);
        }

        if (this.havingHeaders()) {
            params.headers = this.headers;
        }

        if (this.havingCredentials()) {
            params.credentials = "include";
        }

        return params;
    }

    /**
     * Transforming to fetch API url.
     * @returns {string}
     */
    getUrl()
    {
        const should_add_slash = this.base_url && this.base_url.charAt(this.base_url.length - 1) !== '/';
        const url = `${this.base_url}${should_add_slash ? "/" : ""}${this.url}`;

        if (!this.havingQuery()) {
            return url;
        }

        return `${url}?${new URLSearchParams(this.query).toString()}`;
    }

    /**
     * Transforming request to json.
     * @returns
     */
    toJson() {
        return {
            verb: this.verb,
            base_url: this.base_url,
            url: this.url,
            url_with_query: this.getUrl(),
            query: this.query,
            headers: this.headers,
            data: this.data,
            with_credentials: this.with_credentials
        }
    }
}

module.exports = Request;