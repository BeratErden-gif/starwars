const characters = [
    { "id": 1, "name": "Luke Skywalker", "pic": "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg", "homeworld": "tatooine" },
    { "id": 2, "name": "C-3PO", "pic": "https://vignette.wikia.nocookie.net/starwars/images/3/3f/C-3PO_TLJ_Card_Trader_Award_Card.png", "homeworld": "tatooine" },
    { "id": 3, "name": "R2-D2", "pic": "https://vignette.wikia.nocookie.net/starwars/images/e/eb/ArtooTFA2-Fathead.png", "homeworld": "naboo" },
    { "id": 4, "name": "Darth Vader", "pic": "https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg", "homeworld": "tatooine" },
    { "id": 5, "name": "Leia Organa", "pic": "https://vignette.wikia.nocookie.net/starwars/images/f/fc/Leia_Organa_TLJ.png", "homeworld": "alderaan" },
    { "id": 6, "name": "Owen Lars", "pic": "https://vignette.wikia.nocookie.net/starwars/images/e/eb/OwenCardTrader.png", "homeworld": "tatooine" },
    { "id": 7, "name": "Beru Whitesun lars", "pic": "https://vignette.wikia.nocookie.net/starwars/images/c/cc/BeruCardTrader.png", "homeworld": "tatooine" },
    { "id": 8, "name": "R5-D4", "pic": "https://vignette.wikia.nocookie.net/starwars/images/c/cb/R5-D4_Sideshow.png", "homeworld": "tatooine" },
    { "id": 9, "name": "Biggs Darklighter", "pic": "https://vignette.wikia.nocookie.net/starwars/images/0/00/BiggsHS-ANH.png", "homeworld": "tatooine" },
    { "id": 10, "name": "Obi-Wan Kenobi", "pic": "https://vignette.wikia.nocookie.net/starwars/images/4/4e/ObiWanHS-SWE.jpg", "homeworld": "stewjon" },
    { "id": 11, "name": "Anakin Skywalker", "pic": "https://vignette.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png", "homeworld": "tatooine" },
    { "id": 12, "name": "Wilhuff Tarkin", "pic": "https://vignette.wikia.nocookie.net/starwars/images/c/c1/Tarkininfobox.jpg", "homeworld": "eriadu" },
    { "id": 13, "name": "Chewbacca", "pic": "https://vignette.wikia.nocookie.net/starwars/images/4/48/Chewbacca_TLJ.png", "homeworld": "kashyyyk" },
    { "id": 14, "name": "Han Solo", "pic": "https://vignette.wikia.nocookie.net/starwars/images/e/e2/TFAHanSolo.png", "homeworld": "corellia" },
    { "id": 15, "name": "Greedo", "pic": "https://vignette.wikia.nocookie.net/starwars/images/c/c6/Greedo.jpg", "homeworld": "rodia" },
    { "id": 16, "name": "Jabba Desilijic Tiure", "pic": "https://vignette.wikia.nocookie.net/starwars/images/7/7f/Jabba_SWSB.png", "homeworld": "tatooine" },
    { "id": 18, "name": "Wedge Antilles", "pic": "assets/Wedge_Antilles-Denis_Lawson-Star_Wars_(1977).jpg", "homeworld": "corellia" },
    { "id": 19, "name": "Jek Tono Porkins", "pic": "https://vignette.wikia.nocookie.net/starwars/images/e/eb/JekPorkins-DB.png", "homeworld": "bestine" },
    { "id": 20, "name": "Yoda", "pic": "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png", "homeworld": "unknown" },
    { "id": 21, "name": "Palpatine", "pic": "https://vignette.wikia.nocookie.net/starwars/images/d/d8/Emperor_Sidious.png", "homeworld": "naboo" }
];

// Anavatanları al ve filtreleme için benzersiz değerleri çıkar
const homeworldsUnique = [...new Set(characters.map(c => c.homeworld.toLowerCase()))];

const filterContainer = document.getElementById("homeworlds-filter-container");
const button = document.getElementById("toggleButton");
const filterSection = document.getElementById("filterSection");
const container = document.getElementById("charactersContainer");

let isVisible = false;
let selectedHomeworld = null;

// Karakterleri göster/gizle butonu
button.addEventListener("click", () => {
    if (!isVisible) {
        filterSection.style.display = "block"; // Filtreleme bölümünü aç
        renderFilters(); // Filtreleme seçeneklerini oluştur
        renderCharacters(); // Tüm karakterleri göster
        button.textContent = "Karakterleri Gizle";
        button.classList.replace("btn-success", "btn-danger");
    } else {
        filterSection.style.display = "none"; // Filtreleme bölümünü kapat
        container.innerHTML = ""; // Karakterleri temizle
        button.textContent = "Karakterleri Göster";
        button.classList.replace("btn-danger", "btn-success");
        selectedHomeworld = null; // Filtreyi sıfırla
    }
    isVisible = !isVisible;
});

// Filtreleme kutucuklarını oluştur
function renderFilters() {
    filterContainer.innerHTML = ""; // Önce temizle

    homeworldsUnique.forEach(homeworld => {
        const div = document.createElement("div");
        div.classList.add("form-check");

        div.innerHTML = `
            <input class="form-check-input" type="radio" name="homeworld" id="homeworld-${homeworld}" value="${homeworld}">
            <label class="form-check-label" for="homeworld-${homeworld}">${homeworld}</label>
        `;

        // Filtre değiştiğinde seçimi güncelle
        div.querySelector("input").addEventListener("change", (event) => {
            selectedHomeworld = event.target.value;
            renderCharacters(); // Seçilen anavatana göre karakterleri güncelle
        });

        filterContainer.appendChild(div);
    });
}

// Seçilen karakterleri ekrana yazdır
function renderCharacters() {
    container.innerHTML = ""; // Önce temizle
    let filteredCharacters = selectedHomeworld ? characters.filter(c => c.homeworld.toLowerCase() === selectedHomeworld) : characters;

    filteredCharacters.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "d-flex");

        card.innerHTML = `
            <div class="card w-100">
                <img src="${character.pic}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text">Memleket: ${character.homeworld || "Bilinmiyor"}</p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}
