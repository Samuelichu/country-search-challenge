const BASE_URL = 'https://restcountries.com/v3.1';

export const getCountries = async signal => {
  try {
    const response = await fetch(
      `${BASE_URL}/all?fields=name,capital,currencies,region,flags`,
      { signal },
    );
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fallo al cargar países:', error);
    return [];
  }
};

export const getCountry = async (name, signal) => {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}`, { signal });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Fallo al buscar país:', error);
    return [];
  }
};
