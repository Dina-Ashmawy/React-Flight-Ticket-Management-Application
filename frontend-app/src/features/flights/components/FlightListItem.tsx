import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteFlight } from "../../../state/flightSlice";
import { useAppDispatch } from "../../../state/hooks";
import { Flight, FlightListItemsProps } from "../interfaces";



const FlightListItem: React.FC<FlightListItemsProps> = ({ flights }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("access_token") ?? null;

    const deleteHandler = (item: Flight) => {
        if (item.id) {
            if (window.confirm(`Do you really want to delete this item: ${item.airline}?`)) {
                deleteItem(item.id);
            }
        }
    };

    const deleteItem = (id: number) => {
        dispatch(deleteFlight(id))
    };

    const items = flights.map((el, idx) => (
        <tr key={`${el.id}-${el.airline}`}>
            <td>#{++idx}</td>
            <td>
                {!accessToken ? (
                    <span style={{ color: 'gray' }}>{el.airline}</span>
                ) : (
                    <Link to={`flight/${el.id}`}>{el.airline}</Link>
                )}
            </td>
            <td>
                <ButtonGroup aria-label="Basic example" >
                    <Button variant="success" onClick={() => navigate(`flight/${el.id}/edit`)} disabled={!accessToken}> Edit</Button>
                    <Button variant="danger" onClick={() => deleteHandler(el)} disabled={!accessToken}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr >
    ));
    return <>{items}</>;
};

export default FlightListItem;