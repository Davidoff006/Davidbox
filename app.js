const storageKey = "schoolVegetableDemands";

const form = document.querySelector("#demandForm");
const schoolInput = document.querySelector("#schoolInput");
const vegetableInput = document.querySelector("#vegetableInput");
const quantityInput = document.querySelector("#quantityInput");
const unitInput = document.querySelector("#unitInput");
const searchInput = document.querySelector("#searchInput");
const schoolFilter = document.querySelector("#schoolFilter");
const recordsBody = document.querySelector("#recordsBody");
const summaryHead = document.querySelector("#summaryHead");
const summaryBody = document.querySelector("#summaryBody");
const schoolCount = document.querySelector("#schoolCount");
const vegetableCount = document.querySelector("#vegetableCount");
const recordCount = document.querySelector("#recordCount");
const manualRefresh = document.querySelector("#manualRefresh");
const exportCsv = document.querySelector("#exportCsv");
const clearAll = document.querySelector("#clearAll");
const pullRefresh = document.querySelector("#pullRefresh");

const appVersion = "20260528-cloud-orders-1";
const cloudOrdersUrl = "orders.json";
const cloudIdsKey = `${storageKey}:cloudIds`;

const fixedSchools = [
  "九冶小学",
  "九冶中学",
  "新铺小学",
  "新铺幼儿园",
  "青羊驿小学",
  "青阳驿幼儿园",
  "第四中学小学部",
  "第四中学",
  "铜钱坝小学",
  "土车坝小学",
  "勉阳中心小学",
  "勉阳初级中学",
  "沟口小学",
  "驿坝小学",
];

const fixedVegetables = [
  "鸡蛋",
  "土豆",
  "新土豆",
  "新大土豆",
  "小葱",
  "本地大葱",
  "大葱",
  "生姜",
  "老姜",
  "大蒜",
  "净蒜",
  "大西芹",
  "西芹",
  "青椒",
  "西红柿",
  "白菜",
  "包包菜",
  "绿豆芽",
  "黄豆芽",
  "豆芽",
  "豆腐",
  "白豆腐皮",
  "豆干",
  "豆腐干",
  "豆皮",
  "豆泡",
  "蒜苔",
  "茄子",
  "山药",
  "黄瓜",
  "热萝卜",
  "白萝卜",
  "红萝卜",
  "娃娃菜",
  "魔芋皮",
  "魔芋粉",
  "宽粉带",
  "干海带",
  "豆卷",
  "洋葱",
  "螺丝椒",
  "面莲菜",
  "莲菜",
  "小青菜",
  "青菜",
  "小白菜",
  "本地芹菜",
  "麦芹",
  "平菇",
  "西葫芦",
  "冬瓜",
  "油麦菜",
  "香菇",
  "韭菜",
  "生菜",
  "苦瓜",
  "面筋",
  "红线椒",
  "线椒",
  "蒜苗",
  "玉米",
  "糯玉米",
  "青笋",
  "淮山药",
  "铁棍山药",
  "杏鲍菇",
  "金瓜",
  "大头青",
  "有机菜花",
  "菠菜",
  "贝贝瓜",
  "黄椒",
  "红椒",
  "豇豆",
  "香菜",
  "西兰花",
  "丝瓜",
  "荷兰豆",
  "圆青椒",
  "南瓜",
  "金针菇",
  "白心红薯",
  "红心红薯",
  "广红",
  "板栗瓜",
  "竹笋",
  "鲜豌豆粒",
  "紫甘蓝",
  "小米辣",
  "紫薯",
  "海鲜菇",
  "美人椒",
  "蜜薯",
  "鱼酸菜",
  "400g龙口粉丝",
  "泡红椒2kg",
  "红九九",
  "400g紫菜",
  "李氏香油",
  "500g海藻盐",
];

const seedVersion = "2026-05-28-jiuye-middle-1";
const seedRecords = [
  { id: "seed-mianyang-center-001", school: "勉阳中心小学", vegetable: "豆腐", quantity: 10, unit: "斤" },
  { id: "seed-mianyang-center-002", school: "勉阳中心小学", vegetable: "白豆腐皮", quantity: 5, unit: "斤" },
  { id: "seed-mianyang-center-003", school: "勉阳中心小学", vegetable: "黄豆芽", quantity: 5, unit: "斤" },
  { id: "seed-mianyang-center-004", school: "勉阳中心小学", vegetable: "青菜", quantity: 10, unit: "斤" },
  { id: "seed-mianyang-center-005", school: "勉阳中心小学", vegetable: "宽粉带", quantity: 10, unit: "斤" },
  { id: "seed-mianyang-center-006", school: "勉阳中心小学", vegetable: "金针菇", quantity: 5, unit: "斤" },
  { id: "seed-mianyang-center-007", school: "勉阳中心小学", vegetable: "干海带", quantity: 1, unit: "斤" },
  { id: "seed-mianyang-center-008", school: "勉阳中心小学", vegetable: "魔芋皮", quantity: 5, unit: "斤" },
  { id: "seed-mianyang-center-009", school: "勉阳中心小学", vegetable: "麦芹", quantity: 10, unit: "斤" },
  { id: "seed-mianyang-center-010", school: "勉阳中心小学", vegetable: "豆腐干", quantity: 25, unit: "斤" },
  { id: "seed-mianyang-center-011", school: "勉阳中心小学", vegetable: "包包菜", quantity: 50, unit: "斤" },
  { id: "seed-mianyang-center-012", school: "勉阳中心小学", vegetable: "青椒", quantity: 5, unit: "斤" },
  { id: "seed-mianyang-center-013", school: "勉阳中心小学", vegetable: "鱼酸菜", quantity: 4, unit: "袋" },
  { id: "seed-mianyang-center-014", school: "勉阳中心小学", vegetable: "400g龙口粉丝", quantity: 4, unit: "袋" },
  { id: "seed-mianyang-center-015", school: "勉阳中心小学", vegetable: "泡红椒2kg", quantity: 1, unit: "袋" },
  { id: "seed-mianyang-center-016", school: "勉阳中心小学", vegetable: "红九九", quantity: 2, unit: "袋" },
  { id: "seed-mianyang-center-017", school: "勉阳中心小学", vegetable: "400g紫菜", quantity: 2, unit: "袋" },
  { id: "seed-mianyang-middle-001", school: "勉阳初级中学", vegetable: "李氏香油", quantity: 10, unit: "瓶" },
  { id: "seed-mianyang-middle-002", school: "勉阳初级中学", vegetable: "500g海藻盐", quantity: 240, unit: "袋" },
  { id: "seed-mianyang-middle-003", school: "勉阳初级中学", vegetable: "香菇", quantity: 30, unit: "斤" },
  { id: "seed-mianyang-middle-004", school: "勉阳初级中学", vegetable: "青椒", quantity: 30, unit: "斤" },
  { id: "seed-mianyang-middle-005", school: "勉阳初级中学", vegetable: "白菜", quantity: 150, unit: "斤" },
  { id: "seed-mianyang-middle-006", school: "勉阳初级中学", vegetable: "豆腐", quantity: 90, unit: "斤" },
  { id: "seed-mianyang-middle-007", school: "勉阳初级中学", vegetable: "豇豆", quantity: 90, unit: "斤" },
  { id: "seed-mianyang-middle-008", school: "勉阳初级中学", vegetable: "西兰花", quantity: 10, unit: "斤" },
  { id: "seed-mianyang-middle-009", school: "勉阳初级中学", vegetable: "黄瓜", quantity: 30, unit: "斤" },
  { id: "seed-mianyang-middle-010", school: "勉阳初级中学", vegetable: "生菜", quantity: 20, unit: "斤" },
  { id: "seed-mianyang-middle-011", school: "勉阳初级中学", vegetable: "新土豆", quantity: 200, unit: "斤" },
  { id: "seed-jiuye-primary-001", school: "九冶小学", vegetable: "土豆", quantity: 280, unit: "斤" },
  { id: "seed-jiuye-primary-002", school: "九冶小学", vegetable: "山药", quantity: 100, unit: "斤" },
  { id: "seed-jiuye-primary-003", school: "九冶小学", vegetable: "韭菜", quantity: 50, unit: "斤" },
  { id: "seed-jiuye-primary-004", school: "九冶小学", vegetable: "豆芽", quantity: 20, unit: "斤" },
  { id: "seed-jiuye-primary-005", school: "九冶小学", vegetable: "豆腐干", quantity: 35, unit: "斤" },
  { id: "seed-jiuye-primary-006", school: "九冶小学", vegetable: "红椒", quantity: 10, unit: "斤" },
  { id: "seed-jiuye-primary-007", school: "九冶小学", vegetable: "黄椒", quantity: 8, unit: "斤" },
  { id: "seed-jiuye-primary-008", school: "九冶小学", vegetable: "青椒", quantity: 15, unit: "斤" },
  { id: "seed-jiuye-middle-001", school: "九冶中学", vegetable: "白菜", quantity: 100, unit: "斤" },
  { id: "seed-jiuye-middle-002", school: "九冶中学", vegetable: "青椒", quantity: 20, unit: "斤" },
  { id: "seed-jiuye-middle-003", school: "九冶中学", vegetable: "土豆", quantity: 50, unit: "斤" },
];

let records = loadRecords();

function loadRecords() {
  try {
    const storedRecords = JSON.parse(localStorage.getItem(storageKey)) || [];
    return storedRecords.length ? storedRecords : seedRecords.map((record) => ({ ...record }));
  } catch {
    return seedRecords.map((record) => ({ ...record }));
  }
}

function saveRecords() {
  localStorage.setItem(storageKey, JSON.stringify(records));
}

function normalizeRecord(record, index) {
  const school = normalizeText(String(record.school || ""));
  const vegetable = normalizeText(String(record.vegetable || ""));
  const unit = normalizeText(String(record.unit || "斤"));
  const quantity = Number(record.quantity);

  if (!school || !vegetable || !Number.isFinite(quantity) || quantity <= 0) {
    return null;
  }

  return {
    id: normalizeText(String(record.id || `cloud-${index + 1}`)),
    school,
    vegetable,
    quantity,
    unit,
  };
}

async function loadCloudRecords() {
  const response = await fetch(`${cloudOrdersUrl}?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("订单数据加载失败");
  }

  const data = await response.json();
  const rawRecords = Array.isArray(data) ? data : data.records;

  if (!Array.isArray(rawRecords)) {
    throw new Error("订单数据格式不正确");
  }

  return rawRecords.map(normalizeRecord).filter(Boolean);
}

async function syncCloudRecords() {
  try {
    const cloudRecords = await loadCloudRecords();
    const cloudIds = new Set(cloudRecords.map((record) => record.id));
    const previousCloudIds = new Set(JSON.parse(localStorage.getItem(cloudIdsKey)) || []);
    const localRecords = records.filter((record) => !cloudIds.has(record.id) && !previousCloudIds.has(record.id));

    records = [...cloudRecords, ...localRecords];
    saveRecords();
    localStorage.setItem(cloudIdsKey, JSON.stringify([...cloudIds]));
  } catch (error) {
    console.warn(error);
  }
}

function normalizeText(value) {
  return value.trim().replace(/\s+/g, " ");
}

function formatQuantity(value) {
  return Number(value).toLocaleString("zh-CN", {
    maximumFractionDigits: 2,
  });
}

function getVisibleRecords() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedSchool = schoolFilter.value;

  return records.filter((record) => {
    const matchesSchool = !selectedSchool || record.school === selectedSchool;
    const matchesKeyword =
      !keyword ||
      record.school.toLowerCase().includes(keyword) ||
      record.vegetable.toLowerCase().includes(keyword);
    return matchesSchool && matchesKeyword;
  });
}

function groupBySchool(list) {
  return list.reduce((groups, record) => {
    const school = groups.get(record.school) || new Map();
    const key = `${record.vegetable}__${record.unit}`;
    const current = school.get(key) || {
      vegetable: record.vegetable,
      unit: record.unit,
      quantity: 0,
    };
    current.quantity += Number(record.quantity);
    school.set(key, current);
    groups.set(record.school, school);
    return groups;
  }, new Map());
}

function addQuantity(totalMap, unit, quantity) {
  totalMap.set(unit, (totalMap.get(unit) || 0) + Number(quantity));
}

function formatUnitTotals(totalMap) {
  if (!totalMap || !totalMap.size) {
    return "";
  }

  return [...totalMap.entries()]
    .map(([unit, quantity]) => `${formatQuantity(quantity)} ${unit}`)
    .join(" / ");
}

function renderStats() {
  const schools = new Set(records.map((record) => record.school));
  const vegetables = new Set(records.map((record) => record.vegetable));

  schoolCount.textContent = schools.size;
  vegetableCount.textContent = vegetables.size;
  recordCount.textContent = records.length;
}

function renderSchoolFilter() {
  const current = schoolFilter.value;

  schoolFilter.innerHTML = '<option value="">全部学校</option>';
  fixedSchools.forEach((school) => {
    const option = document.createElement("option");
    option.value = school;
    option.textContent = school;
    schoolFilter.append(option);
  });

  schoolFilter.value = fixedSchools.includes(current) ? current : "";
}

function renderSchoolOptions() {
  const current = schoolInput.value;
  schoolInput.innerHTML = '<option value="">请选择学校</option>';

  fixedSchools.forEach((school) => {
    const option = document.createElement("option");
    option.value = school;
    option.textContent = school;
    schoolInput.append(option);
  });

  schoolInput.value = fixedSchools.includes(current) ? current : "";
}

function renderVegetableOptions() {
  const current = vegetableInput.value;
  vegetableInput.innerHTML = '<option value="">请选择蔬菜</option>';

  fixedVegetables.forEach((vegetable) => {
    const option = document.createElement("option");
    option.value = vegetable;
    option.textContent = vegetable;
    vegetableInput.append(option);
  });

  vegetableInput.value = fixedVegetables.includes(current) ? current : "";
}

function renderSummary() {
  const visibleRecords = getVisibleRecords();

  if (!visibleRecords.length) {
    summaryHead.innerHTML = "";
    summaryBody.innerHTML = '<tr><td colspan="2" class="empty-row">暂无数据</td></tr>';
    return;
  }

  const schools = fixedSchools.filter((school) =>
    visibleRecords.some((record) => record.school === school)
  );
  const extraSchools = [
    ...new Set(visibleRecords.map((record) => record.school).filter((school) => !fixedSchools.includes(school))),
  ].sort((a, b) => a.localeCompare(b, "zh-CN"));
  const visibleSchools = [...schools, ...extraSchools];
  const vegetables = fixedVegetables.filter((vegetable) =>
    visibleRecords.some((record) => record.vegetable === vegetable)
  );
  const extraVegetables = [
    ...new Set(
      visibleRecords
        .map((record) => record.vegetable)
        .filter((vegetable) => !fixedVegetables.includes(vegetable))
    ),
  ].sort((a, b) => a.localeCompare(b, "zh-CN"));
  const visibleVegetables = [...vegetables, ...extraVegetables];
  const matrix = new Map();
  const schoolTotals = new Map();
  const vegetableTotals = new Map();

  visibleRecords.forEach((record) => {
    const cellKey = `${record.school}__${record.vegetable}`;
    const cellTotals = matrix.get(cellKey) || new Map();
    const schoolTotal = schoolTotals.get(record.school) || new Map();
    const vegetableTotal = vegetableTotals.get(record.vegetable) || new Map();

    addQuantity(cellTotals, record.unit, record.quantity);
    addQuantity(schoolTotal, record.unit, record.quantity);
    addQuantity(vegetableTotal, record.unit, record.quantity);

    matrix.set(cellKey, cellTotals);
    schoolTotals.set(record.school, schoolTotal);
    vegetableTotals.set(record.vegetable, vegetableTotal);
  });

  summaryHead.innerHTML = "";
  const headerRow = document.createElement("tr");
  ["学校", ...visibleVegetables, "学校合计"].forEach((heading) => {
    const th = document.createElement("th");
    th.textContent = heading;
    headerRow.append(th);
  });
  summaryHead.append(headerRow);

  summaryBody.innerHTML = "";
  visibleSchools.forEach((school) => {
    const row = document.createElement("tr");
    const schoolCell = document.createElement("th");
    schoolCell.className = "row-heading";
    schoolCell.scope = "row";
    schoolCell.textContent = school;
    row.append(schoolCell);

    visibleVegetables.forEach((vegetable) => {
      const cell = document.createElement("td");
      cell.className = "quantity-cell";
      cell.textContent = formatUnitTotals(matrix.get(`${school}__${vegetable}`)) || "-";
      row.append(cell);
    });

    const totalCell = document.createElement("td");
    totalCell.className = "quantity-cell total-cell";
    totalCell.textContent = formatUnitTotals(schoolTotals.get(school));
    row.append(totalCell);
    summaryBody.append(row);
  });

  const totalRow = document.createElement("tr");
  totalRow.className = "grand-total-row";
  const totalTitle = document.createElement("th");
  totalTitle.className = "row-heading";
  totalTitle.scope = "row";
  totalTitle.textContent = "蔬菜合计";
  totalRow.append(totalTitle);

  visibleVegetables.forEach((vegetable) => {
    const cell = document.createElement("td");
    cell.className = "quantity-cell total-cell";
    cell.textContent = formatUnitTotals(vegetableTotals.get(vegetable));
    totalRow.append(cell);
  });

  const allTotalCell = document.createElement("td");
  const allTotals = new Map();
  visibleRecords.forEach((record) => addQuantity(allTotals, record.unit, record.quantity));
  allTotalCell.className = "quantity-cell total-cell";
  allTotalCell.textContent = formatUnitTotals(allTotals);
  totalRow.append(allTotalCell);
  summaryBody.append(totalRow);
}

function renderRecords() {
  const visibleRecords = getVisibleRecords();

  if (!visibleRecords.length) {
    recordsBody.innerHTML = '<tr><td colspan="5" class="empty-row">暂无数据</td></tr>';
    return;
  }

  recordsBody.innerHTML = "";
  visibleRecords.forEach((record) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><button class="delete-btn" type="button">删除</button></td>
    `;
    row.children[0].textContent = record.school;
    row.children[1].textContent = record.vegetable;
    row.children[2].textContent = formatQuantity(record.quantity);
    row.children[3].textContent = record.unit;
    row.querySelector("button").addEventListener("click", () => {
      records = records.filter((item) => item.id !== record.id);
      saveRecords();
      render();
    });
    recordsBody.append(row);
  });
}

function render() {
  renderStats();
  renderSchoolOptions();
  renderVegetableOptions();
  renderSchoolFilter();
  renderSummary();
  renderRecords();
}

function buildSummaryRows() {
  const schools = fixedSchools.filter((school) => records.some((record) => record.school === school));
  const extraSchools = [
    ...new Set(records.map((record) => record.school).filter((school) => !fixedSchools.includes(school))),
  ].sort((a, b) => a.localeCompare(b, "zh-CN"));
  const vegetables = fixedVegetables.filter((vegetable) => records.some((record) => record.vegetable === vegetable));
  const extraVegetables = [
    ...new Set(records.map((record) => record.vegetable).filter((vegetable) => !fixedVegetables.includes(vegetable))),
  ].sort((a, b) => a.localeCompare(b, "zh-CN"));
  const visibleSchools = [...schools, ...extraSchools];
  const visibleVegetables = [...vegetables, ...extraVegetables];
  const matrix = new Map();
  const schoolTotals = new Map();
  const vegetableTotals = new Map();
  const allTotals = new Map();

  records.forEach((record) => {
    const cellKey = `${record.school}__${record.vegetable}`;
    const cellTotals = matrix.get(cellKey) || new Map();
    const schoolTotal = schoolTotals.get(record.school) || new Map();
    const vegetableTotal = vegetableTotals.get(record.vegetable) || new Map();

    addQuantity(cellTotals, record.unit, record.quantity);
    addQuantity(schoolTotal, record.unit, record.quantity);
    addQuantity(vegetableTotal, record.unit, record.quantity);
    addQuantity(allTotals, record.unit, record.quantity);

    matrix.set(cellKey, cellTotals);
    schoolTotals.set(record.school, schoolTotal);
    vegetableTotals.set(record.vegetable, vegetableTotal);
  });

  const rows = [["学校", ...visibleVegetables, "学校合计"]];

  visibleSchools.forEach((school) => {
    rows.push([
      school,
      ...visibleVegetables.map((vegetable) => formatUnitTotals(matrix.get(`${school}__${vegetable}`)) || "-"),
      formatUnitTotals(schoolTotals.get(school)),
    ]);
  });

  rows.push([
    "蔬菜总量",
    ...visibleVegetables.map((vegetable) => formatUnitTotals(vegetableTotals.get(vegetable))),
    formatUnitTotals(allTotals),
  ]);

  return rows;
}

function toCsv(rows) {
  return rows
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const quantity = Number(quantityInput.value);
  if (!Number.isFinite(quantity) || quantity <= 0) {
    quantityInput.focus();
    return;
  }

  records.push({
    id: crypto.randomUUID(),
    school: schoolInput.value,
    vegetable: vegetableInput.value,
    quantity,
    unit: unitInput.value,
  });

  saveRecords();
  render();
  vegetableInput.value = "";
  quantityInput.value = "";
  vegetableInput.focus();
});

searchInput.addEventListener("input", render);
schoolFilter.addEventListener("change", render);

clearAll.addEventListener("click", () => {
  if (!records.length || !confirm("确定清空所有录入数据吗？")) {
    return;
  }
  records = [];
  saveRecords();
  render();
});

exportCsv.addEventListener("click", () => {
  if (!records.length) {
    alert("暂无可导出的数据。");
    return;
  }

  const csv = "\ufeff" + toCsv(buildSummaryRows());
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `学校蔬菜需求汇总-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
});

manualRefresh.addEventListener("click", refreshApp);

function resetPullRefresh(distance = 0) {
  pullRefresh.classList.toggle("is-visible", distance > 0);
  pullRefresh.classList.remove("is-refreshing");
  pullRefresh.style.transform = `translate(-50%, ${distance - 58}px)`;
}

async function refreshApp() {
  pullRefresh.textContent = "正在刷新";
  pullRefresh.classList.add("is-visible", "is-refreshing");
  pullRefresh.style.transform = "translate(-50%, 0)";

  try {
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key.startsWith("school-vegetable-app-")).map((key) => caches.delete(key)));
    }

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.update()));
    }
  } finally {
    const url = new URL(window.location.href);
    url.searchParams.set("refresh", `${appVersion}-${Date.now()}`);
    window.location.replace(url.toString());
  }
}

function initPullToRefresh() {
  let startY = 0;
  let distance = 0;
  let isPulling = false;
  const threshold = 72;

  window.addEventListener(
    "touchstart",
    (event) => {
      const target = event.target;
      const blocksPull =
        target.closest("input, select, textarea, button, .table-wrap") || document.documentElement.scrollTop > 0;

      if (blocksPull || window.scrollY > 0) {
        isPulling = false;
        return;
      }

      startY = event.touches[0].clientY;
      distance = 0;
      isPulling = true;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (event) => {
      if (!isPulling) {
        return;
      }

      const pullDistance = event.touches[0].clientY - startY;
      if (pullDistance <= 0) {
        resetPullRefresh();
        return;
      }

      distance = Math.min(pullDistance * 0.45, 100);
      pullRefresh.textContent = distance >= threshold ? "松开刷新" : "下拉刷新";
      resetPullRefresh(distance);

      if (event.cancelable && pullDistance > 10) {
        event.preventDefault();
      }
    },
    { passive: false }
  );

  window.addEventListener("touchend", () => {
    if (!isPulling) {
      return;
    }

    isPulling = false;
    if (distance >= threshold) {
      refreshApp();
      return;
    }

    distance = 0;
    resetPullRefresh();
  });
}

async function initApp() {
  initPullToRefresh();
  await syncCloudRecords();
  render();
}

initApp();
