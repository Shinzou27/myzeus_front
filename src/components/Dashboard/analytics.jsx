export function getBrandPreference(reports) {
    let grouped = [];
    reports.forEach((r) => {
        if (grouped.map(item => item.label).includes(r.brand)) {
            console.log(grouped.map(item => item.label).indexOf(r.brand));
            console.log(grouped.map(item => item.label));
            grouped[grouped.map(item => item.label).indexOf(r.brand)].value++;
        } else {
            grouped.push({
                label: r.brand,
                value: 1
            });
        }
    });
    return grouped;
}

export function getCostRange(reports) {
    let sentinels = {
        min: 0,
        max: Math.ceil(reports.map(r => parseFloat(r.cost.replace(',', '.'))).sort()[reports.length - 1])
    }
    const step = Math.ceil(sentinels.max) / 5;
    let grouped = [{
        limit: sentinels.min + step * 1,
        label: `0 a ${sentinels.min + step * 1}`,
        value: 0
    }];
    for (let i = 1; i < 5; i++) {
        grouped[i] = {
            limit: sentinels.min + step * (i + 1),
            label: `${grouped[i - 1].limit} a ${sentinels.min + step * (i + 1)}`,
            value: 0
        }
    }
    console.log(sentinels);
    reports.forEach((r) => {
        grouped.find((i) => i.limit > parseFloat(r.cost.replace(',', '.'))).value++;
    });

    return grouped;
}

export function getDataRange(reports) {
    let sentinels = {
        min: reports.sort((a, b) => {
            a = new Date(a.date);
            b = new Date(b.date);
            return (a - b);
        })[0],
        max: reports.sort((a, b) => {
            a = new Date(a.date);
            b = new Date(b.date);
            return (a - b);
        })[reports.length - 1]
    }
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    const minMonth = new Date(sentinels.min.date).getUTCMonth();
    const minYear = new Date(sentinels.min.date).getUTCFullYear();
    const maxMonth = new Date(sentinels.max.date).getUTCMonth();
    const maxYear = new Date(sentinels.max.date).getUTCFullYear();
    //`${months[minMonth]}/${minYear.toString().slice(2)}`
    console.log(`menor valor: mes = ${minMonth}, ano = ${minYear}\nmaior valor: mes = ${maxMonth}, ano = ${maxYear}`);
    let grouped = [];
    let k = minYear;
    for (let i = minMonth; i <= 11; i++) {
        if (k < maxYear || (k == maxYear && i <= maxMonth)) {
            grouped.push({
                label: `${months[i]}/${(k).toString().slice(2)}`,
                value: 0
            })
        }
        if (i == 11 && k < maxYear && (grouped.length >= 12 - minMonth - 1)) {
            i = -1;
            k++;
        }
    };
    console.log(grouped);
    reports.forEach((r) => {
        const date = new Date(r.date);
        const monthYear = `${months[date.getUTCMonth()]}/${(date.getUTCFullYear()).toString().slice(2)}`
        if (grouped.map(item => item.label).includes(monthYear)) {
            grouped[grouped.map(item => item.label).indexOf(monthYear)].value++;
        }
    });
    return grouped;
}
export function getSummary(reports) {
    let data = [getDataRange(reports), getCostRange(reports), getBrandPreference(reports)];
    data = data.map(set => set.sort((a, b) => {
        return a.value - b.value;
    })[set.length-1])
    data.push(getMeanPrice(reports));
    data.push(getBestBuy(reports));
    return data;
}

export function getMeanPrice(reports) {
    let total = 0;
    reports.forEach((r) => {
        total += parseFloat(r.cost.replace(',', '.'))
    });
    return `R$${(total/reports.length).toFixed(2)}`;
}

export function getBestBuy(reports) {
    let result = 0;
    let bestBuy;
    reports.forEach((r) => {
        const amountPerCost = r.amount / parseFloat(r.cost.replace(',', '.'));
        console.log(result > amountPerCost);
        if (result < amountPerCost) {
            result = amountPerCost;
            bestBuy = r.brand;
            console.log(r);
        }
    });
    return [result.toFixed(2), bestBuy];
}