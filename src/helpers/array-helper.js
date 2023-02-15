export const pluck = (array, key) => {
    return array.map(o => o[key])
}