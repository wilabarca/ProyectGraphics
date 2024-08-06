import { fetchData } from "./data.controller.js";
import ArrayCustom from "../models/Array.js";
import LinkedList from "../models/LinkendList.js";

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData();

    const selectOption = document.getElementById('select-option');
    const eleccionParaMostrar = document.getElementById('eleccion');
    const insertButton = document.getElementById('insert-button');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-option');
    const beforeSortContainer = document.getElementById('before-sort');
    const afterSortContainer = document.getElementById('after-sort');
    const searchResults = document.getElementById('results');
    const resultsBody = document.getElementById('results-body');
    const ctx = document.getElementById('myChart').getContext('2d'); // Contexto para Chart.js

    let currentDataStructure;
    const originalData = data.slice(0, 2); 

    // Variables para almacenar tiempos
    const sortingTimes = { 'Array': {}, 'LinkedList': {} };

    function updateDataStructure() {
        const selectedOption = selectOption.value;
        eleccionParaMostrar.textContent = `Operaciones con ${selectedOption}`;

        if (selectedOption === 'Array') {
            currentDataStructure = new ArrayCustom();
        } else if (selectedOption === 'LinkedList') {
            currentDataStructure = new LinkedList();
        }
    }

    function insertData() {
        const startInsert = performance.now();
        currentDataStructure.insert(data); // Usar los 50 registros seleccionados
        const endInsert = performance.now();
        
        logOperation('Inserción', selectOption.value, endInsert - startInsert, currentDataStructure.getIterations());

        beforeSortContainer.textContent = `Datos originales: ${JSON.stringify(originalData)}`;
        currentDataStructure.print();
    }

    function logOperation(operation, description, time, iterations) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${operation}</td>
            <td>${description}</td>
            <td>${time.toFixed(2)}</td>
            <td>${iterations}</td>
        `;
        resultsBody.appendChild(row);
    }

    function updateChart() {
        const chartData = {
            labels: ['Bubble sort', 'Merge sort', 'Radix sort'],
            datasets: [
                {
                    label: 'Tiempo de ejecución (ms) - Array',
                    data: [
                        sortingTimes['Array']['Bubble sort'] || 0,
                        sortingTimes['Array']['Merge sort'] || 0,
                        sortingTimes['Array']['Radix sort'] || 0
                    ],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Tiempo de ejecución (ms) - LinkedList',
                    data: [
                        sortingTimes['LinkedList']['Bubble sort'] || 0,
                        sortingTimes['LinkedList']['Merge sort'] || 0,
                        sortingTimes['LinkedList']['Radix sort'] || 0
                    ],
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        };

        // Si la gráfica ya existe, la actualiza. Si no, crea una nueva.
        if (window.chart) {
            window.chart.data = chartData;
            window.chart.update();
        } else {
            window.chart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    selectOption.addEventListener('change', () => {
        updateDataStructure();
    });

    insertButton.addEventListener('click', () => {
        insertData();
    });

    searchInput.addEventListener('input', (event) => {
        const searchValue = event.target.value;

        const startSearch = performance.now();
        const result = currentDataStructure.search(searchValue);
        const endSearch = performance.now();

        console.log(result ? `Encontrado: ${JSON.stringify(result)}` : 'No encontrado');

        if (result) {
            searchResults.textContent = `Encontrado: ${JSON.stringify(result)}`;
        } else {
            searchResults.textContent = 'No encontrado';
        }

        logOperation('Búsqueda', selectOption.value, endSearch - startSearch, currentDataStructure.getIterations());
    });

    sortSelect.addEventListener('change', (event) => {
        const algorithm = event.target.value;

        const startSort = performance.now();
        currentDataStructure.sort(algorithm);
        const endSort = performance.now();

        // Guardar el tiempo de ejecución en la variable de tiempos
        sortingTimes[selectOption.value][algorithm] = endSort - startSort;

        afterSortContainer.textContent = `Datos ordenados: ${JSON.stringify(currentDataStructure.getItems().slice(0, 10))}`; 
        currentDataStructure.print();

        logOperation('Ordenamiento', `${selectOption.value}, ${algorithm}`, endSort - startSort, currentDataStructure.getIterations());

        // Actualizar la gráfica
        updateChart();
    });

    updateDataStructure();
});
