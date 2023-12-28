import styles from "./Statistics.module.css"; // Импортируйте ваш CSS файл
import BarChart from "../BarChart/BarChart";

const useApi = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
};

function Statistics() {
    return (
        <div className={styles.statistics}>
            <h1>Статистика</h1>
            <p>В разработке</p>
            <BarChart data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        </div>
    );
}

export default Statistics;
