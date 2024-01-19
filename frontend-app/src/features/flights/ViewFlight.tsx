import { Form } from "react-bootstrap";
import withGuard from "../../utils/withGuard";
import useFlightDetails from "./../../custom-hooks/use-flight-details"
import Loading from "../../common/components/Loading";

const ViewFlight = () => {
    const { loading, error, selectedRecord: record } = useFlightDetails();

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Airline</Form.Label>
                <Form.Control type="text" value={record?.airline} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Airline Code</Form.Label>
                <Form.Control type="text" value={record?.code} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Airline Capacity</Form.Label>
                <Form.Control type="text" value={record?.capacity} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Airline Date</Form.Label>
                <Form.Control type="text" value={record?.date} readOnly />
            </Form.Group>

            <Loading loading={loading} error={error}>
                {/* You can add additional UI components or actions here */}
            </Loading>
        </Form>
    );
};


const GuardedViewFlight = withGuard(ViewFlight);

export default GuardedViewFlight;