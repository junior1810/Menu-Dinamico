const menuLista = document.getElementById("menu");
const form = document.getElementById("formMenu");
const selPadre = document.getElementById("selPadre");
const btnMenu = document.getElementById("btnMenu");

let menu = [];

// ===== CARGAR DESDE menu.json =====
fetch("menu.json")
  .then(res => res.json())
  .then(data => {
    menu = data.menu;
    mostrarMenu();
    cargarPadres();
  })
  .catch(() => {
    console.error("Error al cargar el archivo menu.json");
  });

// ===== MOSTRAR MENÚ =====
function mostrarMenu() {
  menuLista.innerHTML = "";

  menu.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = item.nombre;
    a.href = item.enlace || "#";
    li.appendChild(a);

    // submenús
    if (item.submenu && item.submenu.length > 0) {
      const ulSub = document.createElement("ul");

      item.submenu.forEach(sub => {
        const subLi = document.createElement("li");
        const subA = document.createElement("a");
        subA.textContent = sub.nombre;
        subA.href = sub.enlace || "#";
        subLi.appendChild(subA);
        ulSub.appendChild(subLi);
      });

      li.appendChild(ulSub);
    }

    menuLista.appendChild(li);
  });
}

// ===== CARGAR OPCIONES DE PADRES =====
function cargarPadres() {
  selPadre.innerHTML = '<option value="">-- Sin padre (principal) --</option>';

  menu.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.nombre;
    selPadre.appendChild(opt);
  });
}

// ===== AGREGAR NUEVO ELEMENTO =====
form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("txtNombre").value.trim();
  const enlace = document.getElementById("txtEnlace").value.trim();
  const padre = document.getElementById("selPadre").value;

  if (nombre === "") {
    alert("Debe escribir un nombre para el ítem");
    return;
  }

  const nuevo = {
    id: Date.now(),
    nombre,
    enlace
  };

  if (padre) {
    const padreItem = menu.find(x => x.id == padre);
    if (!padreItem.submenu) padreItem.submenu = [];
    padreItem.submenu.push(nuevo);
  } else {
    menu.push(nuevo);
  }

  mostrarMenu();
  cargarPadres();
  form.reset();
});

// ===== MENÚ MÓVIL =====
btnMenu.addEventListener("click", () => {
  menuLista.classList.toggle("active");
});
