import { useEffect, useState } from "react";
import instance from "../libs/QueryApi";

export default function useGetApi(url, headers = null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        if (!url) {
            setData(null);
            setLoading(false);
            return;
        }

        (async () => {
            setLoading(true);
            try {
                const response = await instance.get(url, { headers });
                setData(response.data); // Usa response.data en lugar de response completo
                setLoading(false);
            } catch (error) {
                console.error("Error en la API:", error);
                setData(null); // O maneja el error como prefieras
                setLoading(false);
            }
        })();
    }, [url, trigger]);

    const reload = (reset = false) => {
        if (reset) {
            setLoading(true);
        }

        setTrigger((prev) => prev + 1);
    };

    return {
        data: data,
        loading,
        reload,
    };
}
