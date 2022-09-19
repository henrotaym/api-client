import ApiRequest from "../Request";
import Credential from "./Credential";

/** Representing a JSON credential. */
class JsonCredential extends Credential {
  /** Preparing given request. */
  // eslint-disable-next-line class-methods-use-this
  prepare(request: ApiRequest): void {
    if (!request.isForm)
      request.addHeaders({ "Content-Type": "application/json" });
    request.addHeaders({ Accept: "application/json" });
    request.addHeaders({ "X-Requested-With": "XMLHttpRequest" });
  }
}

export default JsonCredential;
