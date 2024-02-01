// FYI: this file holds the configuration details for the MovieDb API. It includes the base URL, API key, 
// and functions to generate image URLs based on the provided image path

const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDY0YjQ4YmI0ZDg1NmI4OTI4MzMzNzYwNzY4YmZjOSIsInN1YiI6IjY1YWUyYzc2ZDEwMGI2MDBlYjJhZTgwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MOnVgjnW_PDIenVsdCNsmtOxh0UXBTiA-Sp-RvL89Vw',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig