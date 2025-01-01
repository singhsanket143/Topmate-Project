/**
 * The below script is written for usage inside postman.
 * Copy paste the script logic in the script section of your
 * signin request to ensure the token received automatically gets
 * populated in the header of other request.
 */

const response = pm.response.json()

console.log("Response is", response);

if(response.data) {

    pm.collectionVariables.set("authToken", response.data);
}