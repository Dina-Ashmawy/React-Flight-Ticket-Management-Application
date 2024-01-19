import { useEffect } from "react";
import { fetchFlight } from "../state/flightSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks";

const useFlightDetails = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { loading, error, selectedRecord } = useAppSelector((state) => state.flights);
    useEffect(() => {
        dispatch(fetchFlight(id));
    }, [dispatch, id]);

    return { loading, error, selectedRecord };
};

export default useFlightDetails;