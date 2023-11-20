export const setResponse = (data, response) => {
    response.status(200).json(data);
}

export const setErrorResponse = (err, response) => {
    console.log(err);
    response.status(500).json({
        code: "ServiceError",
        message: "Some thing went wrong"
    })
}