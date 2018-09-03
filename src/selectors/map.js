export default (map) => {
    return map.map((m)=> {
        console.log(m)
        const totalRecord = m.idTotalRec;
        return totalRecord;
    });
};