import { CircularProgress } from "@mui/material";

function Loader() {
    return (
        <div className="flex justify-center items-center min-h-[200px]">
            <CircularProgress size={50} color="primary" />
        </div>
    );
}

export default Loader;
