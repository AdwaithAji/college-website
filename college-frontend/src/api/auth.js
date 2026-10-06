let token = sessionStorage.getItem("authToken");
let tokenType = sessionStorage.getItem("tokenType") || "Bearer";

export function setAuthToken(newToken, newTokenType = "Bearer") {
    token = newToken;
    tokenType = newTokenType;

    sessionStorage.setItem("authToken", newToken);
    sessionStorage.setItem("tokenType", newTokenType);
}

export function getAuthToken() {
    return token;
}

export function getAuthorizationHeader() {
    return token ? `${tokenType} ${token}` : null;
}

export function clearAuthToken() {
    token = null;
    tokenType = "Bearer";

    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("tokenType");
}
