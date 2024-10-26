document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value;
    if (query.trim()) {
      fetch(`https://images-api.nasa.gov/search?q=${query}`)
        .then(response => response.json())
        .then(data => mostrarResultados(data.collection.items))
        .catch(error => console.error('Error al obtener los datos:', error));
    }
  });
  
  function mostrarResultados(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; 
  
    items.forEach(item => {
      // VER SI POSEE IMG Y DESC
      const imageLink = item.links ? item.links[0].href : 'Imagen no disponible';
      const title = item.data[0].title || 'Sin título';
      const description = item.data[0].description || 'Descripción no disponible';
      const date = item.data[0].date_created || 'Fecha no disponible';
  
      const card = `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${imageLink}" class="img-fluid rounded-start" alt="${title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text"><small class="text-muted">Fecha: ${date}</small></p>
              </div>
            </div>
          </div>
        </div>
      `;
  
      contenedor.innerHTML += card;
    });
  }
  
