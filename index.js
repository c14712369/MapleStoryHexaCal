// 起源各等級所需碎片、滿等總數量
let skillList = [
    { level: 0, need: 0 },
    { level: 1, need: 30 },
    { level: 2, need: 35 },
    { level: 3, need: 40 },
    { level: 4, need: 45 },
    { level: 5, need: 50 },
    { level: 6, need: 55 },
    { level: 7, need: 60 },
    { level: 8, need: 65 },
    { level: 9, need: 200 },
    { level: 10, need: 80 },
    { level: 11, need: 90 },
    { level: 12, need: 100 },
    { level: 13, need: 110 },
    { level: 14, need: 120 },
    { level: 15, need: 130 },
    { level: 16, need: 140 },
    { level: 17, need: 150 },
    { level: 18, need: 160 },
    { level: 19, need: 350 },
    { level: 20, need: 170 },
    { level: 21, need: 180 },
    { level: 22, need: 190 },
    { level: 23, need: 200 },
    { level: 24, need: 210 },
    { level: 25, need: 220 },
    { level: 26, need: 230 },
    { level: 27, need: 240 },
    { level: 28, need: 250 },
    { level: 29, need: 500 },
    { level: 30, need: 0 }
];
let skillSumNeed = 4400;

// 精通各等級所需碎片、滿等總數量
let jintonList = [
    { level: 0, need: 50 },
    { level: 1, need: 15 },
    { level: 2, need: 18 },
    { level: 3, need: 20 },
    { level: 4, need: 23 },
    { level: 5, need: 25 },
    { level: 6, need: 28 },
    { level: 7, need: 30 },
    { level: 8, need: 33 },
    { level: 9, need: 100 },
    { level: 10, need: 40 },
    { level: 11, need: 45 },
    { level: 12, need: 50 },
    { level: 13, need: 55 },
    { level: 14, need: 60 },
    { level: 15, need: 65 },
    { level: 16, need: 70 },
    { level: 17, need: 75 },
    { level: 18, need: 80 },
    { level: 19, need: 175 },
    { level: 20, need: 85 },
    { level: 21, need: 90 },
    { level: 22, need: 95 },
    { level: 23, need: 100 },
    { level: 24, need: 105 },
    { level: 25, need: 110 },
    { level: 26, need: 115 },
    { level: 27, need: 120 },
    { level: 28, need: 125 },
    { level: 29, need: 250 },
    { level: 30, need: 0 }
];
let jintonSumNeed = 2252;

// 強化核心各等級所需碎片、滿等總數量
let strongList = [
    { level: 0, need: 75 },
    { level: 1, need: 23 },
    { level: 2, need: 27 },
    { level: 3, need: 30 },
    { level: 4, need: 34 },
    { level: 5, need: 38 },
    { level: 6, need: 42 },
    { level: 7, need: 45 },
    { level: 8, need: 49 },
    { level: 9, need: 150 },
    { level: 10, need: 60 },
    { level: 11, need: 68 },
    { level: 12, need: 75 },
    { level: 13, need: 83 },
    { level: 14, need: 90 },
    { level: 15, need: 98 },
    { level: 16, need: 105 },
    { level: 17, need: 113 },
    { level: 18, need: 120 },
    { level: 19, need: 263 },
    { level: 20, need: 128 },
    { level: 21, need: 135 },
    { level: 22, need: 143 },
    { level: 23, need: 150 },
    { level: 24, need: 158 },
    { level: 25, need: 165 },
    { level: 26, need: 173 },
    { level: 27, need: 180 },
    { level: 28, need: 188 },
    { level: 29, need: 375 },
    { level: 30, need: 0 }
];
let strongSumNeed = 3383;

// 共通核心各等級所需碎片、滿等總數量
let publicList = [
    { level: 0, need: 125 },
    { level: 1, need: 38 },
    { level: 2, need: 44 },
    { level: 3, need: 50 },
    { level: 4, need: 57 },
    { level: 5, need: 63 },
    { level: 6, need: 69 },
    { level: 7, need: 75 },
    { level: 8, need: 82 },
    { level: 9, need: 300 },
    { level: 10, need: 110 },
    { level: 11, need: 124 },
    { level: 12, need: 138 },
    { level: 13, need: 152 },
    { level: 14, need: 165 },
    { level: 15, need: 179 },
    { level: 16, need: 193 },
    { level: 17, need: 207 },
    { level: 18, need: 220 },
    { level: 19, need: 525 },
    { level: 20, need: 234 },
    { level: 21, need: 248 },
    { level: 22, need: 262 },
    { level: 23, need: 275 },
    { level: 24, need: 289 },
    { level: 25, need: 303 },
    { level: 26, need: 317 },
    { level: 27, need: 330 },
    { level: 28, need: 344 },
    { level: 29, need: 750 },
    { level: 30, need: 0 }
];
let publicSumNeed = 6268;

// 碎片所需數量
let totalNeed = skillSumNeed + jintonSumNeed * 2 + strongSumNeed * 4 + publicSumNeed;
document.getElementById("onePersentNeed").innerHTML = totalNeed * 0.01;

function calculate() {
    // 計算起源
    let skill = document.getElementById('skillInput').value;
    let skillRes = 0;
    skillList.forEach((e) => {
        if (e.level < skill)
            skillRes += e.need;
    })
    document.getElementById("skillSum").innerHTML = skillRes;
    document.getElementById("skillNeed").innerHTML = skillSumNeed - skillRes;

    // 計算精通1
    let jinton1 = document.getElementById('jinton1Input').value;
    let jinton1Res = 0;
    jintonList.forEach((e) => {
        if (e.level < jinton1)
            jinton1Res += e.need;
    })
    document.getElementById("jinton1Sum").innerHTML = jinton1Res;
    document.getElementById("jinton1Need").innerHTML = jintonSumNeed - jinton1Res;

    // 計算精通2
    let jinton2 = document.getElementById('jinton2Input').value;
    let jinton2Res = 0;
    jintonList.forEach((e) => {
        if (e.level < jinton2)
            jinton2Res += e.need;
    })
    document.getElementById("jinton2Sum").innerHTML = jinton2Res;
    document.getElementById("jinton2Need").innerHTML = jintonSumNeed - jinton2Res;

    // 計算強化1
    let strong1 = document.getElementById('strong1Input').value;
    let strong1Res = 0;
    strongList.forEach((e) => {
        if (e.level < strong1)
            strong1Res += e.need;
    })
    document.getElementById("strong1Sum").innerHTML = strong1Res;
    document.getElementById("strong1Need").innerHTML = strongSumNeed - strong1Res;

    // 計算強化2
    let strong2 = document.getElementById('strong2Input').value;
    let strong2Res = 0;
    strongList.forEach((e) => {
        if (e.level < strong2)
            strong2Res += e.need;
    })
    document.getElementById("strong2Sum").innerHTML = strong2Res;
    document.getElementById("strong2Need").innerHTML = strongSumNeed - strong2Res;

    // 計算強化3
    let strong3 = document.getElementById('strong3Input').value;
    let strong3Res = 0;
    strongList.forEach((e) => {
        if (e.level < strong3)
            strong3Res += e.need;
    })
    document.getElementById("strong3Sum").innerHTML = strong3Res;
    document.getElementById("strong3Need").innerHTML = strongSumNeed - strong3Res;

    // 計算強化4
    let strong4 = document.getElementById('strong4Input').value;
    let strong4Res = 0;
    strongList.forEach((e) => {
        if (e.level < strong4)
            strong4Res += e.need;
    })
    document.getElementById("strong4Sum").innerHTML = strong4Res;
    document.getElementById("strong4Need").innerHTML = strongSumNeed - strong4Res;

    // 計算共通1
    let public1 = document.getElementById('public1Input').value;
    let public1Res = 0;
    publicList.forEach((e) => {
        if (e.level < public1)
            public1Res += e.need;
    })
    document.getElementById("public1Sum").innerHTML = public1Res;
    document.getElementById("public1Need").innerHTML = publicSumNeed - public1Res;

    // 計算總消耗、還需碎片量
    let totalUse = skillRes + jinton1Res + jinton2Res + strong1Res + strong2Res + strong3Res + strong4Res + public1Res;
    document.getElementById("totalUsed").innerHTML = totalUse;
    document.getElementById("totalNeed").innerHTML = totalNeed - totalUse;

    // 更新進度條
    updateProgress(totalUse)
}

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('input[type="number"]');

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            let value = parseInt(this.value);
            if (value > 30) {
                this.value = 30;
            } else if (value < 1) {
                this.value = 1;
            }
        });
    });
});

function updateProgress(currentValue) {
    const progressElement = document.getElementById('vvv');
    const percentElement = document.getElementById('totalPersent');

    // 設置 progress 元素的 value
    progressElement.value = currentValue;

    // 計算百分比
    const percent = (currentValue / totalNeed) * 100;

    // 更新百分比顯示
    percentElement.textContent = percent.toFixed(2); // 保留兩位小數
}