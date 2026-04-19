/**
 * URLS BASE PARA APIS
 */
const POKE_API = "https://pokeapi.co/api/v2";
const API_BASE = "https://jsonplaceholder.typicode.com";
const WEATHER_API = "https://restcountries.com/v3.1";
const SITE_AUTOR = "Melina Quiñajo";
let currentFilter = 'all'; 

// ============================================
// 1. DEMOSTRACIÓN DE ES6+ (Lo que sale en la consola)
// ============================================

console.log(`¡Hola desde el portafolio de ${SITE_AUTOR}! 🚀`);

const devProfile = {
    name: SITE_AUTOR,
    role: 'Full Stack Developer',
    location: 'La Paz, Bolivia',
    skills: ['JavaScript', 'React', 'Node.js', 'Python']
};

// Destructuración de Objetos
const { role, skills } = devProfile;
// Destructuración de Arreglos + Operador Rest
const [mainSkill, ...otherSkills] = skills; 

console.log(`${SITE_AUTOR} - ${role}`);
console.log(`Skill principal: ${mainSkill}`);
console.log(`Otras skills:`, otherSkills);

// Operador Spread en Arreglos
const frontEnd = ['React', 'Angular', 'TypeScript'];
const backEnd = ['Node.js', 'Express', 'Django'];
const stackCompleto = [...frontEnd, ...backEnd];

console.log('Stack completo:', stackCompleto);

// Operador Spread en Objetos
console.log('Perfil actualizado:', { ...devProfile, available: true });


/** 2. CLASE PROJECT **/
class Project {
    #id; 
    constructor({id, title, description, techs, emoji, category}) {
        this.#id = id;
        this.title = title;
        this.description = description;
        this.techs = techs; 
        this.emoji = emoji;
        this.category = category;
    }
    get id() { return this.#id; }

    toHtml() {
        const badges = this.techs
            .map(tech => `<span class="tech-badge">${tech}</span>`)
            .join('');

        return `
        <article class="project-card" data-id="${this.#id}" data-category="${this.category}">
            <div class="project-img" aria-hidden="true">${this.emoji}</div>
            <div class="project-info">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
                <footer class="project-tags">
                    ${badges}
                </footer>
            </div>
        </article>`;
    }
}

/** 3. ARRAY DE DATOS **/
const localProjects = [
    new Project({
        id: 1, category: 'frontend', emoji: '📱',
        title: 'Dispositivos móviles',
        description: 'La materia de Dispositivos Móviles se centra en el diseño, desarrollo y optimización de aplicaciones software específicamente creadas para funcionar en plataformas portátiles.',
        techs: ['Kotlin', 'Swift'],
    }),
    new Project({
        id: 2, category: 'backend', emoji: '🗄️',
        title: 'Base de Datos',
        description: 'La materia de Base de Datos es uno de los pilares fundamentales de la Ingeniería de Sistemas. Se encarga del estudio de la estructura, almacenamiento, manipulación y recuperación de grandes volúmenes de datos.',
        techs: ['PostgreSQL', 'MySQL', 'MariaDB'],
    }),
    new Project({
        id: 3, category: 'backend', emoji: '🌐',
        title: 'Redes',
        description: 'La materia de Redes de Computadoras es la disciplina que estudia la interconexión de nodos para compartir recursos, intercambiar datos y garantizar la comunicación bajo estándares específicos.',
        techs: ['Cisco', 'TCP/IP'],
    }),
    new Project({
        id: 4, category: 'fullstack', emoji: '🤖',
        title: 'Introducción a la robótica',
        description: 'La Robótica combina la mecánica, electrónica e informática para diseñar máquinas automáticas capaces de realizar tareas que requieren precisión, fuerza o autonomía.',
        techs: ['Arduino', 'C++'],
    }),
    new Project({
        id: 5, category: 'frontend', emoji: '🎨',
        title: 'Fundamento de Diseño y Animación',
        description: 'Se trata de entender cómo el ojo humano percibe la información y cómo podemos usar la tecnología para guiar esa percepción de forma efectiva.',
        techs: ['Figma', 'Blender'],
    }),
    new Project({
        id: 6, category: 'backend', emoji: '🔢',
        title: 'Fundamentos Digitales',
        description: 'Esta es la base matemática de la informática. Se enfoca en cómo construir sistemas lógicos complejos a partir de niveles lógicos definidos: 0 y 1.',
        techs: ['Lógica Booleana'],
    })
];

// Métodos de Array para Consola (Map y Reduce)
console.log('Titulos', localProjects.map(p => p.title));
const porCategoria = localProjects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
}, {});
console.log('Por Categoria', porCategoria);


/** 4. LÓGICA DEL DOM + MANIPULACION**/
const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const pokeSection = document.getElementById('poke-section');
const pokeGrid = document.getElementById('poke-grid');
const pokeBtnNext = document.getElementById('poke-next');
const countryInput = document.getElementById('country-search');
const countryResult = document.getElementById('country-result');

function renderProjects(category = 'all') {
    if (!projectsGrid) return;
    
    const filtered = category === 'all' 
        ? localProjects 
        : localProjects.filter(p => p.category === category);

    projectsGrid.innerHTML = filtered
        .map(p => p.toHtml())
        .join('');

    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });

    const counter = document.getElementById('project-count');
    if (counter) counter.textContent = `${filtered.length} materias encontradas`;
}

// Eventos de Filtro
filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentFilter = e.currentTarget.dataset.filter;
        renderProjects(currentFilter);
    });
});
renderProjects();

/**
 * LOCAL STORAGE 
 */
function saveFormDraft(data) {
    localStorage.setItem('form-draft', JSON.stringify(data));
}

/**
 * PROMESAS (Promise)
 */
function validateEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (valid) {
                resolve({ ok: true, email });
            } else {
                reject(new Error(`Email inválido: ${email}`));
            }
        }, 500);
    });
}

// --- CONSUMO DE LA PROMESA DE VALIDACIÓN ---
validateEmail('melina@ejemplo.com')
    .then(({ email }) => console.log(`✅ Email válido: ${email}`))
    .catch(err => console.error('❌', err.message));

/** Manejo de errores en fetch */
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    return await res.json();
}

/**
 * POKEAPI - POKEMON
 */
async function fetchPokemon(offset = 0, limit = 6) {
    if (!pokeGrid) return;
    pokeGrid.innerHTML = '<p>Cargando pokemones...</p>';

    try {
        const data = await fetchJSON(`${POKE_API}/pokemon?offset=${offset}&limit=${limit}`);
        const promises = data.results.map(pokemon => fetchJSON(pokemon.url));
        const details = await Promise.all(promises);

        pokeGrid.innerHTML = details.map(({ name, id, sprites, types }) => {
            const type = types[0].type.name;
            const img = sprites.other['official-artwork'].front_default || sprites.front_default;
            
            return `
            <div class="poke-card poke--${type}">
                <img src="${img}" alt="${name}" loading="lazy" />
                <p class="poke-name">#${id} ${name}</p>
                <span class="poke-type">${type}</span>
            </div>`;
        }).join('');

    } catch (error) {
        console.error('Error al cargar pokemones:', error);
    }
}

/**
 * REST COUNTRIES - PAÍSES
 */
async function fetchCountry(query) {
    if(!countryResult || !query.trim()) return;
    countryResult.innerHTML = '<p>Buscando país...</p>';

    try {
        const [country] = await fetchJSON(
            `${WEATHER_API}/name/${encodeURIComponent(query)}?fields=name,capital,population,flags,region`
        );

        const {
            name: { common },
            capital: [capital] = ['N/A'],
            population,
            flags: { svg: flag },
            region,
        } = country;

        countryResult.innerHTML = `
        <div class="country-card">
            <img src="${flag}" alt="Bandera de ${common}" class="country-flag" />
            <div class="country-info">
                <h4>${common}</h4>
                <p>🏙️ Capital: <strong>${capital}</strong></p>
                <p>🌍 Región: <strong>${region}</strong></p>
                <p>👥 Población: <strong>${population.toLocaleString()}</strong></p>
            </div>
        </div>`;

    } catch (error) {
        countryResult.innerHTML = `<p class="error-text">País no encontrado.</p>`;
    }
}

/**
 * LÓGICA DE BÚSQUEDA Y INICIALIZACIÓN
 */
let searchTimer;
if (countryInput) {
    countryInput.addEventListener('input', (e) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            fetchCountry(e.target.value);
        }, 600);
    });
}

let pokeOffset = 0;
if (pokeBtnNext) {
    pokeBtnNext.addEventListener('click', () => {
        pokeOffset += 6;
        fetchPokemon(pokeOffset);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (pokeSection) fetchPokemon(0);
});