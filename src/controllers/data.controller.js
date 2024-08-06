// data.controller.js
let data = [];

export async function fetchData() {
    try {
        const response = await fetch("./src/data/bussines.json"); // Ruta relativa desde index.html

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        data = jsonData.slice(0, 400);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
