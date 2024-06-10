import Quote from "@/components/quotes";
import { fetchdata } from "../lib/middleware/fetch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export default async function Home() {
  const quotes = await fetchdata("quotes/random?limit=20");
  return (
    <Box>
      <Typography textAlign={"center"} my={2} variant="h5">
        Tranding Qutoes
      </Typography>
      {quotes?.map((quote, index) => {
        return <Quote key={index} quote={quote} />;
      })}
    </Box>
  );
}
