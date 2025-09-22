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

export  function useMutationApi(url, method = "POST") {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mutate = async (body = {}, headers = null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await instance({
                url,
                method,
                data: body,
                headers,
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            console.error(`Error en ${method}:`, err);
            setError(err);
            setData(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        mutate, 
    };
}
