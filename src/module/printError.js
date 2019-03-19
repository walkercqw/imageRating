export default (title, infoObj, type = 'error') => {
    if (location.href.indexOf('print=all') > -1) {
        let color = type == 'error' ? '#ff6f6f' : '#69fc73';

        console.log('\n%c================================%s================================',`color:${color};background-color:black;`,title);
        for (let key in infoObj) {
            console.log(`${key}: `, infoObj[key]);
        }
        console.log('\n\n');
    }

    if (location.href.indexOf('print=error') > -1 && type == 'error') {
        console.log('\n%c================================%s================================',`color:#ff6f6f;background-color:black;`,title);
        for (let key in infoObj) {
            console.log(`${key}: `, infoObj[key]);
        }
        console.log('\n\n');
    }
}



