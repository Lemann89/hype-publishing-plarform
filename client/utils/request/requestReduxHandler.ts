export const requestReduxHandler = (success, loading, error) => ({
    reduxLoading: loading,
    reduxSuccess: success,
    reduxError: error,
});
