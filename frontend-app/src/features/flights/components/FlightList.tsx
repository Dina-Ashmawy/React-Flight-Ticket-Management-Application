import { Table } from 'react-bootstrap'
import FlightListItem from './FlightListItem';
import { FlightListItemsProps } from '../interfaces';

const FlightList: React.FC<FlightListItemsProps> = ({ flights }) => {
    return (
        flights?.length > 0 ?
            <Table striped bordered hover >
                < thead >
                    <tr>
                        <th>#</th>
                        <th style={{ width: "70%" }}>Title</th>
                        <th style={{ width: "10%" }}></th>
                    </tr>
                </thead >
                <tbody>
                    <FlightListItem flights={flights} />
                </tbody>
            </Table > :
            <p> No flight tickets found</p>
    );
};

export default FlightList;
