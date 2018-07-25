export function getTags(input: { Confidence: number, TagName: string }[]) {
    let out = '';
    input.forEach(item => {
        if (item.Confidence >= 90) {
            out += ` ${item.TagName}`
        }
    })
    return out;
}

export function getKeywords(input: string[]) {
    let out = '';
    input.forEach(item => {
        out += ` ${item}`
    })
    return out;
}

export function getLinks(input: string) {
    const inputArray = input.split(',')
    const out = ` Register: ${inputArray[0]} Give: ${inputArray[1]} Learn More: ${inputArray[2]}`;
    return out;
}

export function getNewGUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};