const Autok = [
    { id: 1, marka: "Audi", modell: "A4", ev: 2018, ar: 6500000, kep: "../img/audi a4.jpg" },
    { id: 2, marka: "BMW", modell: "320d", ev: 2019, ar: 7200000, kep: "../img/bmw 320d.jpg" },
    { id: 3, marka: "Mercedes", modell: "Mercedes AMG G63", ev: 2017, ar: 6900000, kep: "../img/mercedes amg g 63.jpeg"  },
    { id: 4, marka: "Toyota", modell: "Corolla", ev: 2020, ar: 5500000, kep: "../img/toyota.jpg"  },
    { id: 5, marka: "Honda", modell: "Civic", ev: 2018, ar: 5200000, kep: "../img/honda.jpg"  },
    { id: 6, marka: "Ford", modell: "Focus", ev: 2016, ar: 4300000, kep: "../img/ford.jpg"  },
    { id: 7, marka: "Volkswagen", modell: "Golf", ev: 2019, ar: 6000000, kep: "../img/golf.jpg"  },
    { id: 8, marka: "Skoda", modell: "Octavia", ev: 2021, ar: 7500000, kep: "../img/skoda.jpg"  },
    { id: 9, marka: "Mazda", modell: "3", ev: 2017, ar: 4800000, kep: "../img/mazda.jpg"  },
    { id: 10, marka: "Hyundai", modell: "i30", ev: 2018, ar: 4700000, kep: "../img/hyundai.jpg"  },
    { id: 11, marka: "Kia", modell: "Ceed", ev: 2019, ar: 5100000, kep: "../img/kia.jpg"  },
    { id: 12, marka: "Opel", modell: "Astra", ev: 2016, ar: 4200000, kep: "../img/opel.jpg"  }
];

localStorage.setItem("Autok", JSON.stringify(Autok));
const AutokLista = JSON.parse(localStorage.getItem("Autok")) || [];

const szuloElem = document.getElementById("Ingatlanok");
const form = document.querySelector(".filter-sidebar form");

const arMinInput = document.getElementById("price-min");
const arMaxInput = document.getElementById("price-max");
const markaSelect = document.getElementById("type");
const clearBtn = document.getElementById("szuroTorles");

const evInput = document.getElementById("year");
const evText = document.getElementById("yearTEXT");

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

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(info);

        szuloElem.appendChild(card);
    });
}

renderAutok(AutokLista);

function MinP() {
    document.getElementById("minPriceTEXT").textContent =
        arMinInput.value + " Ft";
}

function MaxP() {
    document.getElementById("maxPriceTEXT").textContent =
        arMaxInput.value + " Ft";
}

evInput.addEventListener("input", () => {
    evText.textContent = evInput.value;
});

form.addEventListener("submit", e => {
    e.preventDefault();

    const min = parseInt(arMinInput.value);
    const max = parseInt(arMaxInput.value);
    const marka = markaSelect.value;
    const ev = parseInt(evInput.value);

    const szurt = AutokLista.filter(auto => {
        if (auto.ar < min || auto.ar > max) return false;
        if (marka && auto.marka !== marka) return false;
        if (auto.ev < ev) return false;
        return true;
    });

    renderAutok(szurt);
});

clearBtn.addEventListener("click", () => {
    form.reset();

    arMinInput.value = minAr;
    arMaxInput.value = maxAr;
    evInput.value = minEv;

    MinP();
    MaxP();
    evText.textContent = minEv;

    renderAutok(AutokLista);
});