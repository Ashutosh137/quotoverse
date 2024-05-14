import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Stack, Typography } from "@mui/material";

export default function Author({ author }) {
  return (
    <Stack
      passHref
      fullwidth
      direction={"row"}
      sx={{ textDecoration: "none" }}
      borderRadius={3}
      my={1}
      border={1}
      p={1}
      color={"primary"}
      spacing={1}
    >
      <Box my={"auto"} p={2}>
        <Avatar width={50} variant="circular" />
      </Box>
      <Stack py={4} textTransform={"capitalize"}>
        <Stack justifyContent={"space-between"} direction={"row"}>
          <Box>
            <Typography color={"primary"} variant="h5">
              {author?.name}
            </Typography>
            <Typography color={"primary"} variant="body1">
              {author?.description}
            </Typography>
          </Box>
          <Box my={1} mr={2}>
            <Button
              href={author?.link}
              variant="contained"
              component={"a"}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              Visit
            </Button>
          </Box>
        </Stack>

        <Typography
          my={2}
          mr={2}
          whiteSpace={"break-spaces"}
          color={"primary"}
          variant="subtitle1"
        >
          {author?.content || author?.bio}
        </Typography>
        <Typography
          variant="body1"
          my={2}
          textTransform={"capitalize"}
          color="primary"
        >
          total quotes : {author.quoteCount}
        </Typography>
      </Stack>
    </Stack>
  );
}
