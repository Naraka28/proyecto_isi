import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
export interface RefreshButtonProps {
  queryK: string[];
}

export function RefreshButton({ queryK }: RefreshButtonProps) {
  const queryClient = useQueryClient();
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: queryK });
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#E90074",
          width: "1.5rem",
          height: "3.5rem",
          borderRadius: "1.4rem",
          textTransform: "none", // Desactiva el texto en mayúsculas
        }}
        onClick={() => handleRefresh()}
        className={`hover:bg-[#75003a] transition-colors ease-in-out duration-[400ms]`}
      >
        <FontAwesomeIcon
          icon={faArrowsRotate}
          style={{
            margin: "0.5rem",
            width: "1rem",
            height: "1rem",
          }}
        />
      </Button>
    </>
  );
}
