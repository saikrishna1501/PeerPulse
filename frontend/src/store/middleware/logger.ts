const logger = (params: any) => (store: any) => (next: any) => (action: any) => {
    console.log("Store:", store);
    console.log("Next:", next);
    console.log("Action:", action);
    console.log("Logging", params);

    return next(action);
};

export default logger;
