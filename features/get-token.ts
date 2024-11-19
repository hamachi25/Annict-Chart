export function getToken() {
    const token = localStorage.getItem("token");
    if (!token || token === "") {
        return null;
    }
    return token;
}
