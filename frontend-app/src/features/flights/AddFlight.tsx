import { FormEvent, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { addFlight } from "../../state/flightSlice";
import withGuard from "../../utils/withGuard";
import { Flight } from "./interfaces";
import Loading from "../../common/components/Loading";
const AddFlight = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const flightsSelector = useAppSelector((state) => state.flights);

    const [formData, setFormData] = useState<Flight>({
        airline: "",
        capacity: "",
        date: "",
        code: "",
    });

    const [validationError, setValidationError] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(addFlight(formData))
                .unwrap()
                .then(() => {
                    navigate("/");
                });
        }
    };
    const validateForm = () => {
        const { airline, code, capacity, date } = formData;

        if (!airline || !code || !capacity || !date) {
            setValidationError("All fields are required");
            return false;
        }

        setValidationError(null);
        return true;
    };
    return (
        <Form onSubmit={formHandler}>
            <Form.Group className="mb-3">
                <Form.Label>Airline Name</Form.Label>
                <Form.Control
                    type="text"
                    name="airline"
                    value={formData.airline}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Airline Code</Form.Label>
                <Form.Control
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Airline Capacity</Form.Label>
                <Form.Control
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Airline Date</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={flightsSelector.loading}>
                Submit
            </Button>
            <Loading loading={flightsSelector.loading} error={flightsSelector.error} />
            {validationError && <Alert variant="danger">{validationError}</Alert>}

        </Form>
    );
};

const GuardedAddFlight = withGuard(AddFlight);

export default GuardedAddFlight;
