const flattenData = (data, value = "value") => {
    return data.map(elem => elem[value]);
}

export {
    flattenData
};