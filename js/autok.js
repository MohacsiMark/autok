const Autok = [
    { id: 1, marka: "Audi", modell: "A4", ev: 2018, ar: 6500000, kep: "../img/audi a4.jpg" },
    { id: 2, marka: "BMW", modell: "320d", ev: 2019, ar: 7200000, kep: "../img/bmw 320d.jpg" },
    { id: 3, marka: "Mercedes", modell: "Mercedes AMG G63", ev: 2017, ar: 6900000, kep: "../img/mercedes amg g 63.jpeg" },
    { id: 4, marka: "Toyota", modell: "Corolla", ev: 2020, ar: 5500000, kep: "../img/toyota.jpg" },
    { id: 5, marka: "Honda", modell: "Civic", ev: 2018, ar: 5200000, kep: "../img/honda.jpg" },
    { id: 6, marka: "Ford", modell: "Focus", ev: 2016, ar: 4300000, kep: "../img/ford.jpg" },
    { id: 7, marka: "Volkswagen", modell: "Golf", ev: 2019, ar: 6000000, kep: "../img/golf.jpg" },
    { id: 8, marka: "Skoda", modell: "Octavia", ev: 2021, ar: 7500000, kep: "../img/skoda.jpg" },
    { id: 9, marka: "Mazda", modell: "3", ev: 2017, ar: 4800000, kep: "../img/mazda.jpg" },
    { id: 10, marka: "Hyundai", modell: "i30", ev: 2018, ar: 4700000, kep: "../img/hyundai.jpg" },
    { id: 11, marka: "Kia", modell: "Ceed", ev: 2019, ar: 5100000, kep: "../img/kia.jpg" },
    { id: 12, marka: "Opel", modell: "Astra", ev: 2016, ar: 4200000, kep: "../img/opel.jpg" }
];

localStorage.setItem("Autok", JSON.stringify(Autok));
let AutokLista = JSON.parse(localStorage.getItem("Autok")) || [];

const szuloElem = document.getElementById("Ingatlanok");

const filterForm = document.getElementById("filterForm");
const arMinInput = document.getElementById("price-min");
const arMaxInput = document.getElementById("price-max");
const evInput = document.getElementById("year");
const evText = document.getElementById("yearTEXT");
const markaSelect = document.getElementById("type");
const clearBtn = document.getElementById("szuroTorles");

const felModForm = document.getElementById("felModForm");
const autoIdInput = document.getElementById("autoId");
const felModMarka = document.getElementById("felModMarka");
const felModModell = document.getElementById("felModModell");
const felModEv = document.getElementById("felModEv");
const felModAr = document.getElementById("felModAr");
const felModKep = document.getElementById("felModKep");
const felModSub = document.getElementById("felModSub");
const felModDel = document.getElementById("felModDel");

const arak = AutokLista.map(a => a.ar);
const minAr = Math.min(...arak);
const maxAr = Math.max(...arak);

arMinInput.min = minAr;
arMinInput.max = maxAr;
arMinInput.value = minAr;

arMaxInput.min = minAr;
arMaxInput.max = maxAr;
arMaxInput.value = maxAr;

document.getElementById("minPriceTEXT").textContent = minAr + " Ft";
document.getElementById("maxPriceTEXT").textContent = maxAr + " Ft";

const evek = AutokLista.map(a => a.ev);
const minEv = Math.min(...evek);
const maxEv = Math.max(...evek);

evInput.min = minEv;
evInput.max = maxEv;
evInput.value = minEv;
evText.textContent = minEv;

const markak = [...new Set(AutokLista.map(a => a.marka))];
markaSelect.innerHTML = `<option value="">Mindegy</option>`;
markak.forEach(marka => {
    const opt = document.createElement("option");
    opt.value = marka;
    opt.textContent = marka;
    markaSelect.appendChild(opt);
});

function MinP() { document.getElementById("minPriceTEXT").textContent = arMinInput.value + " Ft"; }
function MaxP() { document.getElementById("maxPriceTEXT").textContent = arMaxInput.value + " Ft"; }

evInput.addEventListener("input", () => { evText.textContent = evInput.value; });

function renderAutok(lista) {
    szuloElem.innerHTML = "";
    lista.forEach(auto => {
        const card = document.createElement("div");
        card.className = "property-card";

        const img = document.createElement("img");
        img.src = auto.kep;
        img.alt = auto.marka;

        const title = document.createElement("h3");
        title.textContent = `${auto.marka} ${auto.modell}`;

        const info = document.createElement("p");
        info.textContent = `${auto.ev} | Ár: ${auto.ar.toLocaleString()} Ft`;

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class","cardBtn");
        deleteBtn.setAttribute("id",auto.marka)
        deleteBtn.textContent = "Törlés";
        deleteBtn.addEventListener("click", () => {
        const index = AutokLista.findIndex(a => a.id === auto.id);
        AutokLista.splice(index, 1);
        localStorage.setItem("Autok", JSON.stringify(AutokLista));
        renderAutok(AutokLista);
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Módosítás";
        editBtn.setAttribute("class","cardBtn");
        editBtn.setAttribute("id",auto.id)
        felModMarka.setAttribute("id","marka")
        editBtn.addEventListener("click", () => {
            autoIdInput.value = auto.id;
            felModMarka.value = auto.marka;
            felModModell.value = auto.modell;
            felModEv.value = auto.ev;
            felModAr.value = auto.ar;
            felModKep.value = auto.kep;
            felModSub.textContent = "Módosítás mentése";
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(info);
        card.appendChild(editBtn);
        card.appendChild(deleteBtn);

        szuloElem.appendChild(card);
    });
}

renderAutok(AutokLista);

felModForm.addEventListener("submit", e => {
    e.preventDefault();
    const id = autoIdInput.value ? parseInt(autoIdInput.value) : Date.now();
    const ujAuto = {
        id: id,
        marka: felModMarka.value,
        modell: felModModell.value,
        ev: parseInt(felModEv.value),
        ar: parseInt(felModAr.value),
        kep: felModKep.value
    };

    if(autoIdInput.value) {
        const index = AutokLista.findIndex(a => a.id === ujAuto.id);
        AutokLista[index] = ujAuto;
    } else {
        AutokLista.push(ujAuto);
    }

    localStorage.setItem("Autok", JSON.stringify(AutokLista));
    renderAutok(AutokLista);
    felModForm.reset();
    autoIdInput.value = "";
    felModSub.textContent = "Mentés";
});

felModDel.addEventListener("click", () => {
    felModForm.reset();
    autoIdInput.value = "";
    felModSub.textContent = "Mentés";
});



filterForm.addEventListener("submit", e => {
    e.preventDefault();
    const min = parseInt(arMinInput.value);
    const max = parseInt(arMaxInput.value);
    const marka = markaSelect.value;
    const ev = parseInt(evInput.value);

    const szurt = AutokLista.filter(auto => {
        if(auto.ar < min || auto.ar > max) return false;
        if(marka && auto.marka !== marka) return false;
        if(auto.ev < ev) return false;
        return true;
    });
    renderAutok(szurt);
});

clearBtn.addEventListener("click", () => {
    filterForm.reset();
    arMinInput.value = minAr;
    arMaxInput.value = maxAr;
    evInput.value = minEv;
    MinP();
    MaxP();
    evText.textContent = minEv;
    renderAutok(AutokLista);
});