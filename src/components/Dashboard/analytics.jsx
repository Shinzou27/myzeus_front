export function getBrandPreference(reports) {
    let grouped = [];
    reports.forEach((r) => {
        if (grouped.map(item => item.label).includes(r.brand)) {
            const selected = grouped[grouped.map(item => item.label).indexOf(r.brand)];
            selected.value++;
            selected.totalCost += parseFloat(r.cost.replace(',', '.'));
            selected.totalAmount += r.amount;
        } else {
            grouped.push({
                label: r.brand,
                value: 1,
                totalCost: parseFloat(r.cost.replace(',', '.')),
                totalAmount: r.amount
            });
        }
    });
    return grouped;
}

export function getCostRange(reports) {
    const intervalNumber = 6
    const maxValue = Math.ceil(reports.map(r => parseFloat(r.cost.replace(',', '.'))).sort((a, b) => {
        return a - b;
    })[reports.length - 1]);
    let sentinels = {
        min: 0,
        max: maxValue
    }
    const step = Math.ceil(sentinels.max) / intervalNumber;

    let grouped = [{
        limit: sentinels.min + step * 1,
        label: `R$00,00 a R$${(sentinels.min + step * 1).toFixed(2).replace('.', ',')}`,
        value: 0
    }];
    for (let i = 1; i < intervalNumber; i++) {
        grouped[i] = {
            limit: sentinels.min + step * (i + 1),
            label: `R$${(grouped[i - 1].limit).toFixed(2).replace('.', ',')} a R$${(sentinels.min + step * (i + 1)).toFixed(2).replace('.', ',')}`,
            value: 0
        }
    }
    console.log(grouped);
    reports.forEach((r) => {
        grouped.find((i) => i.limit >= parseFloat(r.cost.replace(',', '.'))).value++;
    });

    return grouped;
}
export function getSeparatedCostRange(reports) {
    let groupedByPet = [];
    reports.forEach((r) => {
        if (groupedByPet.map(item => item.label).includes(r.petId)) {
            const selected = groupedByPet[groupedByPet.map(item => item.label).indexOf(r.petId)];
            selected.reports.push(r);
        } else {
            groupedByPet.push({
                label: r.petId,
                reports: [r],
                data: []
            });
        }
    });

    const intervalNumber = 6
    const maxValue = Math.ceil(reports.map(r => parseFloat(r.cost.replace(',', '.'))).sort((a, b) => {
        return a - b;
    })[reports.length - 1]);
    let sentinels = {
        min: 0,
        max: maxValue
    }
    const step = Math.ceil(sentinels.max) / intervalNumber;
    let grouped = {
        labels: [`R$00,00 a R$${(sentinels.min + step * 1).toFixed(2).replace('.', ',')}`],
        data: []
    };
    let limits = [0];
    for (let i = 1; i < intervalNumber; i++) {
        const min = sentinels.min + i * step;
        const max = sentinels.min + (i + 1) * step;
        limits.push(min);
        grouped.labels.push(
            `R$${min.toFixed(2).replace('.', ',')} a R$${max.toFixed(2).replace('.', ',')}`,
        )
    }
    groupedByPet.forEach((pet) => {
        pet.data.length = grouped.labels.length;
        pet.data.fill(0);
        pet.reports.forEach((r) => {
            let index = limits.findIndex((l) => l > parseFloat(r.cost.replace(',', '.')));
            if (index == -1) index = limits.length;
            pet.data[index-1]++;
        })
        grouped.data.push({
            label: pet.label,
            data: pet.data
        })
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
    reports.forEach((r) => {
        const date = new Date(r.date);
        const monthYear = `${months[date.getUTCMonth()]}/${(date.getUTCFullYear()).toString().slice(2)}`
        if (grouped.map(item => item.label).includes(monthYear)) {
            grouped[grouped.map(item => item.label).indexOf(monthYear)].value++;
        }
    });
    return grouped;
}
export function getSeparatedDataRange(reports) {
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
    let groupedByPet = [];
    reports.forEach((r) => {
        if (groupedByPet.map(item => item.label).includes(r.petId)) {
            const selected = groupedByPet[groupedByPet.map(item => item.label).indexOf(r.petId)];
            selected.reports.push(r);
        } else {
            groupedByPet.push({
                label: r.petId,
                reports: [r],
                data: []
            });
        }
    });
    let grouped = {
        labels: [],
        data: []
    };
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    const minMonth = new Date(sentinels.min.date).getUTCMonth();
    const minYear = new Date(sentinels.min.date).getUTCFullYear();
    const maxMonth = new Date(sentinels.max.date).getUTCMonth();
    const maxYear = new Date(sentinels.max.date).getUTCFullYear();
    let k = minYear;
    for (let i = minMonth; i <= 11; i++) {
        if (k < maxYear || (k == maxYear && i <= maxMonth)) {
            grouped.labels.push(`${months[i]}/${(k).toString().slice(2)}`)
        }
        if (i == 11 && k < maxYear && (grouped.labels.length >= 12 - minMonth - 1)) {
            i = -1;
            k++;
        }
    };
    groupedByPet.forEach((pet) => {
        pet.data.length = grouped.labels.length;
        pet.data.fill(0);
        pet.reports.forEach((r) => {
            const date = new Date(r.date);
            const monthYear = `${months[date.getUTCMonth()]}/${(date.getUTCFullYear()).toString().slice(2)}`
            if (grouped.labels.includes(monthYear)) {
                pet.data[grouped.labels.indexOf(monthYear)]++;
            }
        });
        grouped.data.push({
            label: pet.label,
            data: pet.data,
            color: ''
        });
    })
    return grouped;
}
export function getSummary(reports) {
    let data = [getDataRange(reports), getCostRange(reports), getBrandPreference(reports)];
    data = data.map(set => set.sort((a, b) => {
        return a.value - b.value;
    })[set.length - 1])
    data.push(getMeanPrice(reports));
    data.push(getBestBuy(reports));
    return data;
}

export function getMeanPrice(reports) {
    let total = 0;
    reports.forEach((r) => {
        total += parseFloat(r.cost.replace(',', '.'))
    });
    return `R$${(total / reports.length).toFixed(2)}`;
}

export function getBestBuy(reports) {
    const summarizedByBranch = getBrandPreference(reports);
    let result = 0;
    let bestBuy;
    summarizedByBranch.forEach((b) => {
        const amountPerCost = b.totalAmount / b.totalCost;
        if (result < amountPerCost) {
            result = amountPerCost;
            bestBuy = b.label;
        }
    });
    return [result.toFixed(2), bestBuy];
}