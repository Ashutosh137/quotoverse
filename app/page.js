import Quote from "@/components/quotes";
import { fetchdata } from "./fetch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export default async function Home() {
  const quotes = await fetchdata("quotes/random?limit=20");
  return (
    <Box sx={{ mx: "auto" }} maxWidth="lg">
      <Typography textAlign={"center"} variant="h5" m={2}>
        Tranding qutoes
      </Typography>
      {quotes?.map((quote, index) => {
        return <Quote key={index} quote={quote} />;
      })}
    </Box>
  );
}
