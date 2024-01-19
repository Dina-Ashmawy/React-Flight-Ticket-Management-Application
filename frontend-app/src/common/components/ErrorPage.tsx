import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRouteError } from 'react-router-dom';
import { ErrorDescription } from "../../interfaces";


const ErrorPage: React.FC = () => {
    const error = useRouteError() as ErrorDescription;
    const navigate = useNavigate();

    return (
        <div className="mt-5 text-center">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
            <Button
                variant="link"
                onClick={() => navigate("/", { replace: true })}
            >
                Link
            </Button>
        </div>
    );
};

export default ErrorPage;
