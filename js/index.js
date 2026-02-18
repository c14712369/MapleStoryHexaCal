
// Configuration for Cores
const CORE_CONFIG = [
    {
        id: 'origin',
        label: '起源技能',
        max: 6, // Updated to 6
        data: skillList, // From data.js
        sumNeed: skillSumNeed,
        defaultActive: 2,
        defaultValues: { 1: 1 },
        className: 'origin'
    },
    {
        id: 'mastery',
        label: '精通核心',
        max: 4,
        data: jintonList,
        sumNeed: jintonSumNeed,
        defaultActive: 2,
        className: 'mastery'
    },
    {
        id: 'boost',
        label: '強化核心',
        max: 4,
        data: strongList,
        sumNeed: strongSumNeed,
        defaultActive: 4,
        className: 'boost'
    },
    {
        id: 'common',
        label: '共用核心',
        max: 4,
        data: publicList,
        sumNeed: publicSumNeed,
        defaultActive: 1,
        className: 'common'
    }
];

// Initialize the UI
document.addEventListener("DOMContentLoaded", function () {
    initSettings();
    initCores();
    loadData(); // Load saved preferences AFTER UI is built
    calculate(); // Initial calculation

    // Close modal when clicking outside
    window.onclick = function (event) {
        const modal = document.getElementById('settingsModal');
        if (event.target == modal) {
            closeSettingsModal();
        }
    }
});

function initSettings() {
    const container = document.getElementById('settingsContainer');
    let html = '';

    // Global Settings Section
    html += `<div class="setting-group"><h4>全域設定</h4>`;
    html += `
        <label class="checkbox-wrapper full-width">
            <input type="checkbox" id="temp_includeCommon_toggle" checked>
            <span>納入共用核心計算</span>
        </label>
    </div>`;

    CORE_CONFIG.forEach(config => {
        html += `<div class="setting-group"><h4>${config.label}</h4><div class="checkbox-grid">`;
        for (let i = 1; i <= config.max; i++) {
            const inputId = `${config.id}_${i}`;
            const isDefaultActive = i <= config.defaultActive;

            // Check if this is Origin #1
            const isLocked = (config.id === 'origin' && i === 1);

            html += `
                <label class="checkbox-wrapper ${isLocked ? 'locked' : ''}">
                    <input type="checkbox" id="temp_check_${inputId}" ${isDefaultActive || isLocked ? 'checked' : ''} ${isLocked ? 'disabled' : ''}>
                    <span>#${i}</span>
                </label>
            `;
        }
        html += `</div></div>`;
    });

    // Update Footer with new Save function
    const footer = document.querySelector('.modal-footer');
    if (footer) {
        footer.innerHTML = `<button class="save-btn" onclick="saveSettings()">完成</button>`;
    }

    container.innerHTML = html;
}

function initCores() {
    const container = document.getElementById('coresContainer');
    let html = '';

    CORE_CONFIG.forEach(config => {
        // Create Section Wrapper
        html += `
            <div class="core-section" id="section_${config.id}">
                <h3 class="section-title ${config.className}">${config.label}</h3>
                <div class="section-grid">
        `;

        for (let i = 1; i <= config.max; i++) {
            const inputId = `${config.id}_${i}`;
            // Default Value Logic
            let defaultValue = 0;
            if (config.defaultValues && config.defaultValues[i]) {
                defaultValue = config.defaultValues[i];
            }

            html += `
                <div class="core-card ${config.className}" id="con_${inputId}" style="display: none;">
                    <div class="card-header">
                        <span class="core-title">#${i}</span>
                        <div class="level-input-group">
                            <label>Lv.</label>
                            <input class="core-input" id="input_${inputId}" type="number" min="0" max="30" value="${defaultValue}" oninput="validateInput(this); calculate()">
                        </div>
                    </div>
                    <div class="card-stats">
                        <div class="stat-row">
                            <span>已消耗</span>
                            <span id="sum_${inputId}">0</span>
                        </div>
                        <div class="stat-row">
                            <span>還需要</span>
                            <span id="need_${inputId}">0</span>
                        </div>
                    </div>
                </div>
            `;
        }

        html += `   </div>
                </div>`; // Close grid and section
    });

    container.innerHTML = html;

    // Apply default visibility based on config.defaultActive (without saving)
    // Actual state will be overwritten by loadData if exists
    CORE_CONFIG.forEach(config => {
        for (let i = 1; i <= config.max; i++) {
            const inputId = `${config.id}_${i}`;
            const isDefaultActive = i <= config.defaultActive;
            const container = document.getElementById(`con_${inputId}`);
            if (container) {
                container.style.display = isDefaultActive ? 'flex' : 'none';
                container.setAttribute('data-active', isDefaultActive); // Store state in DOM
            }
        }
    });
}

function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = "flex";

    // Load current ACTIVE state into Temp Checkboxes

    // 1. Common Calculation Toggle
    const includeCommonWrapper = document.getElementById('temp_includeCommon_toggle');
    if (includeCommonWrapper) {
        includeCommonWrapper.checked = window.includeCommonCalc !== false; // Default true
    }

    // 2. Core Toggles
    CORE_CONFIG.forEach(config => {
        for (let i = 1; i <= config.max; i++) {
            const inputId = `${config.id}_${i}`;
            const tempCheckbox = document.getElementById(`temp_check_${inputId}`);
            const container = document.getElementById(`con_${inputId}`);

            // Special handling for Origin #1 -> Always checked
            if (config.id === 'origin' && i === 1) {
                if (tempCheckbox) {
                    tempCheckbox.checked = true;
                    tempCheckbox.disabled = true;
                }
                continue;
            }

            // Check if container is visible
            const isVisible = container.style.display !== 'none';
            if (tempCheckbox) tempCheckbox.checked = isVisible;
        }
    });
}

function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = "none";
}

// Replaces toggleSettingsModal
function toggleSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal.style.display === "flex") {
        closeSettingsModal();
    } else {
        openSettingsModal();
    }
}

function saveSettings() {
    // Apply Temp Checkboxes to Real State

    // 1. Common Calculation Toggle
    const includeCommonWrapper = document.getElementById('temp_includeCommon_toggle');
    window.includeCommonCalc = includeCommonWrapper.checked;

    // 2. Core Toggles
    CORE_CONFIG.forEach(config => {
        for (let i = 1; i <= config.max; i++) {
            const inputId = `${config.id}_${i}`;
            const tempCheckbox = document.getElementById(`temp_check_${inputId}`);
            const container = document.getElementById(`con_${inputId}`);

            if (tempCheckbox && container) {
                // Ensure Origin #1 is always active
                if (config.id === 'origin' && i === 1) {
                    container.style.display = 'flex';
                    container.setAttribute('data-active', 'true');
                } else {
                    if (tempCheckbox.checked) {
                        container.style.display = 'flex';
                        container.setAttribute('data-active', 'true');
                    } else {
                        container.style.display = 'none';
                        container.setAttribute('data-active', 'false');
                    }
                }
            }
        }
    });

    calculate();
    saveData();
    closeSettingsModal();
}


function validateInput(input) {
    let value = parseInt(input.value);

    // Check min value based on ID
    let minVal = 0;
    if (input.id === 'input_origin_1') {
        minVal = 1;
    }

    if (isNaN(value)) value = minVal;
    if (value > 30) value = 30;
    if (value < minVal) value = minVal;

    // Update input value only if it changed (avoids cursor jump issues on some browsers, though minor here)
    if (input.value != value) input.value = value;
}

function calculate() {
    let grandTotalUsed = 0;
    let grandTotalNeed = 0;

    // Use window.includeCommonCalc, default to true if undefined
    const includeCommon = window.includeCommonCalc !== false;

    CORE_CONFIG.forEach(config => {
        for (let i = 1; i <= config.max; i++) {
            const inputId = `${config.id}_${i}`;
            const container = document.getElementById(`con_${inputId}`);

            // Allow active check via style or attribute
            const isActive = (config.id === 'origin' && i === 1) || (container.style.display !== 'none');

            if (isActive) {
                const input = document.getElementById(`input_${inputId}`);
                const currentLevel = parseInt(input.value) || 0;

                // Determine Total Need for this specific Core
                // Start with base sumNeed (default)
                let specificSumNeed = config.sumNeed;

                // If it is Origin #2, #3, #4, #5, #6, we add 100 to the total need (Level 0->1 costs 100)
                // Note: config.sumNeed in data.js is 4400.
                if (config.id === 'origin' && i > 1) {
                    specificSumNeed += 100;
                }

                // Calculate used
                let used = 0;
                config.data.forEach(item => {
                    let cost = item.need;

                    // Override cost for Origin #2, #3, #4, #5, #6 at Level 0 (Unlock cost)
                    // Currently data.js has { level: 0, need: 0 }
                    if (config.id === 'origin' && i > 1 && item.level === 0) {
                        cost = 100;
                    }

                    if (item.level < currentLevel) {
                        used += cost;
                    }
                });

                // Calculate need (Total needed for max level - used)
                const need = specificSumNeed - used;

                // Update UI for this core
                document.getElementById(`sum_${inputId}`).textContent = used;
                document.getElementById(`need_${inputId}`).textContent = need;

                // Check Global Toggle for Common
                if (config.id === 'common' && !includeCommon) {
                    // Skip
                } else {
                    grandTotalUsed += used;
                    grandTotalNeed += specificSumNeed;
                }
            }
        }
    });

    const totalRemaining = grandTotalNeed - grandTotalUsed;

    // Update Stats
    document.getElementById("totalUsed").textContent = grandTotalUsed;
    document.getElementById("totalNeed").textContent = totalRemaining;
    document.getElementById("onePersentNeed").textContent = Math.round(grandTotalNeed * 0.01);

    // Update Circle Progress
    const percentElement = document.getElementById('totalPersent');
    const circleElement = document.getElementById('progress-circle');

    const percent = grandTotalNeed > 0 ? (grandTotalUsed / grandTotalNeed) * 100 : 0;
    percentElement.textContent = `${percent.toFixed(2)}%`;

    const dashArrayValue = isNaN(percent) ? 0 : percent;
    circleElement.setAttribute('stroke-dasharray', `${dashArrayValue}, 100`);

    if (percent >= 100) {
        circleElement.style.stroke = "#00ff00";
    } else {
        circleElement.style.stroke = "#00e5ff";
    }

    // Auto-save on every calculation (which triggers on input)
    saveData();
}

function saveData() {
    const data = {};
    // Save inputs
    document.querySelectorAll('input.core-input').forEach(input => {
        data[input.id] = input.value;
    });

    // Save active state of cores
    CORE_CONFIG.forEach(config => {
        for (let i = 1; i <= config.max; i++) {
            const inputId = `${config.id}_${i}`;
            const container = document.getElementById(`con_${inputId}`);
            // Logic applies here too, but display check is sufficient
            data[`active_${inputId}`] = (container.style.display !== 'none');
        }
    });

    // Save common calc toggle
    data['includeCommonCalc'] = window.includeCommonCalc;

    localStorage.setItem('mapleHexaData', JSON.stringify(data));
}

function loadData() {
    const saved = localStorage.getItem('mapleHexaData');
    if (saved) {
        let data;
        try {
            data = JSON.parse(saved);
        } catch (e) {
            console.error("Save data invalid", e);
            return;
        }

        // Restore Common Calc
        if (data.hasOwnProperty('includeCommonCalc')) {
            window.includeCommonCalc = data['includeCommonCalc'];
        }

        // Restore Active States
        for (const key in data) {
            if (key.startsWith('active_')) {
                const inputId = key.replace('active_', '');
                const container = document.getElementById(`con_${inputId}`);
                if (container) {
                    const isActive = data[key];
                    container.style.display = isActive ? 'flex' : 'none';
                    container.setAttribute('data-active', isActive);
                }
            }
        }

        // Force Origin #1 active regardless of saved data (repair/enforce)
        const origin1Container = document.getElementById('con_origin_1');
        if (origin1Container) {
            origin1Container.style.display = 'flex';
            origin1Container.setAttribute('data-active', 'true');
        }

        // Restore inputs
        for (const id in data) {
            if (id.startsWith('input_')) {
                const input = document.getElementById(id);
                if (input) {
                    if (id === 'input_origin_1' && (parseInt(data[id]) < 1 || !data[id])) {
                        input.value = 1;
                    } else {
                        input.value = data[id];
                    }
                }
            }
        }
    }
}
