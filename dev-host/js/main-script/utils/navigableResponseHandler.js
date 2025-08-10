/**
 * Handles the response from the Navigable API.
 * It checks if the response is successful and throws an error if not.
 *
 * @param res The response object from the Navigable API.
 * @throws Will throw an error if the response indicates failure or contains errors.
 * @returns  Returns true if the response is successful.
 */
const navigableResponseHandler = (res) => {
    if (!res || !res.success) {
        let errorString = "";
        if (!res.errors) {
            errorString = "An unexpected error occurred.";
        }
        else {
            Object.keys(res.errors).forEach((key) => {
                errorString += `${key.toUpperCase()}: ${res.errors ? res.errors[key] : "Something went wrong"}. `;
            });
        }
        throw new Error(`Error: ${errorString}`);
    }
    return true;
};
export default navigableResponseHandler;
