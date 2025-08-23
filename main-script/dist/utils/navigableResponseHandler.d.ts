import { NavigableAPIResponse } from "../adapters/ChatProvider/navigable/navigable";
/**
 * Handles the response from the Navigable API.
 * It checks if the response is successful and throws an error if not.
 *
 * @param res The response object from the Navigable API.
 * @throws Will throw an error if the response indicates failure or contains errors.
 * @returns  Returns true if the response is successful.
 */
declare const navigableResponseHandler: <T>(res: NavigableAPIResponse<T>) => boolean;
export default navigableResponseHandler;
