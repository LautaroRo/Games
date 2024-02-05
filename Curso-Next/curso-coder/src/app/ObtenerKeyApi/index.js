const obtenerIdYCartas = async () => {
    try {
        const api = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const data = await api.json();

        const id = data?.deck_id;

        const cartas = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=52`;

        return {cartas} ;
    } catch (error) {
        console.error("Error al obtener datos:", error);
        throw error;
    }
};

export default obtenerIdYCartas;