import { fetchdata } from "../../lib/middleware/fetch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Stack } from "@mui/material";
export const metadata = {
  title: "Tags || Quotoverse",
  description: "all tags in quotoverse",
};
export default async function Page() {
  const tags = await fetchdata("tags");
  return (
    <Box>
      <Typography variant="h5" my={5} textAlign={"center"} color="primary">
        Tags
      </Typography>
      {tags.map((tag, index) => {
        return (
          <Stack
            sx={{
              textDecoration: "none",
              borderColor: "primary",
            }}
            key={index}
            direction={"row"}
            justifyContent={"space-between"}
            border={1}
            p={1}
            px={3}
            borderRadius={3}
            spacing={2}
            my={3}
            component={Link}
            color="primary"
            href={`tag/${tag?.slug}`}
          >
            <Typography variant="button" color="primary">
              # {tag?.name} :
            </Typography>
            <Typography variant="body1" color="primary">
              {tag?.quoteCount}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
}
