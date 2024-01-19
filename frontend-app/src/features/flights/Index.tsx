import { useEffect } from "react";
import { fetchFlights } from "../../state/flightSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import FlightList from "./components/FlightList";
import Loading from "../../common/components/Loading";

const Index = () => {
    const dispatch = useAppDispatch();
    const { records, loading, error } = useAppSelector((state) => state.flights);
    useEffect(() => {
        dispatch(fetchFlights());
    }, [])

    return (
        <Loading loading={loading} error={error}>
            <FlightList flights={records} />
        </Loading>
    );
};

export default Index;
