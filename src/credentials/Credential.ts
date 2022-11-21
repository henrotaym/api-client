import ApiRequest from "../Request";

/** Representing a client credential. */
abstract class Credential {
  beforeSendingCallbacks: ((request: ApiRequest) => void)[] = [];
  /** Preparing given request. */
  abstract prepare(request: ApiRequest): void;

  /** Used to perform action on a request before sending it. */
  beforeSending(callback: (request: ApiRequest) => void): this {
    this.beforeSendingCallbacks.push(callback);

    return this;
  }

  /** Processing configured before sending callbacks. */
  fireBeforeSendingCallbacks(request: ApiRequest) {
    this.beforeSendingCallbacks.forEach((callback) => callback(request));
  }
}

export default Credential;
