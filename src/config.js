export const getApiUrl = () => {
    const runtimeUrl = window.ENV?.API_URL || window.ENV?.BASE_URL;
    if (runtimeUrl) {
        return runtimeUrl;
    }

    return process.env.REACT_APP_API_URL || "";
};

export const getBaseUrl = () => getApiUrl();