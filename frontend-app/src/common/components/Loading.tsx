import { LoadingProps } from "../interfaces";


const Loading: React.FC<LoadingProps> = ({ loading, error, children }) => {
    return (
        <>
            {loading ? (
                <p>loading please wait...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                children
            )
            }
        </>
    );
};

export default Loading;