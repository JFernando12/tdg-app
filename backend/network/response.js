const general = (res, status, count, next, previous, results) => {
    return res.status(status).json({
        count,
        next,
        previous,
        results
    })
}

const getOne = (res, status, data) => {
    return res.status(status).json({
        data
    })
}

const error = (res, status, message) => {
    return res.status(status).json({
        message
    })
}

const success = (res, status, message) => {
    return res.status(status).json({
        message
    })
}

module.exports = {
    general,
    error,
    success,
    getOne
}