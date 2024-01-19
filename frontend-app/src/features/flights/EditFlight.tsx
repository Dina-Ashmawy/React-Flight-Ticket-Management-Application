import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useAppDispatch } from "../../state/hooks";
import useFlightDetails from "../../custom-hooks/use-flight-details";
import { updateFlight } from "../../state/flightSlice";
import withGuard from "../../utils/withGuard";
import { Flight } from "./interfaces";
import Loading from "../../common/components/Loading";


const initialRecordState: Flight = {
    id: 0,
    airline: "",
    code: "",
    capacity: "",
    date: "",
}
const EditFlight = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, selectedRecord: record } = useFlightDetails();
    const [formData, setFormData] = useState<Flight>({
        airline: record?.airline ?? "",
        code: record?.code ?? "",
        capacity: record?.capacity ?? '0',
        date: record?.date ?? "",
    });

    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        if (record && !formData.airline) {
            setFormData(() => ({
                id: record.id,
                airline: record.airline,
                capacity: record.capacity,
                date: record.date,
                code: record.code,
            }));
        } else {
            setFormData(initialRecordState);
        }
    }, [record]);

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(updateFlight(formData))
                .unwrap()
                .then(() => navigate("/"));
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            id: prevFormData.id ?? 0,
            [name]: value,
        }));
    };

    return (
        <Form onSubmit={formHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Airline</Form.Label>
                <Form.Control
                    type="text"
                    name="airline"
                    value={formData.airline}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Airline Code</Form.Label>
                <Form.Control
                    disabled
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Airline Capacity</Form.Label>
                <Form.Control
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Airline Date</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Loading loading={loading} error={error}>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                {validationError && <Alert variant="danger">{validationError}</Alert>}

            </Loading>
        </Form>
    );
};

const GuardedEditFlight = withGuard(EditFlight);

export default GuardedEditFlight;
