"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Stack, Typography, Box } from "@mui/material";
import useNavigate from "@/lib/hooks/usenavigate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Resetpassword({ token }) {
  const [newpassword, setnewpassword] = useState("");

  const router = useRouter();
  return (
    <Box>
      <Typography
        py={2}
        variant="h6"
        color="primary"
        textAlign={"center"}
        textTransform={"capitalize"}
      >
        change your password
      </Typography>

      <Stack
        component={"form"}
        m={5}
        onSubmit={async (e) => {
          e.preventDefault();
          const data = await fetch(
            `${window.origin}/reset-password/${token}/api`,
            {
              method: "POST",
              cache: "no-cache",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password: newpassword, token }),
            },
          ).then((res) => res.json());

          if (data.message) {
            toast.success(data.message);
            router.push("/login");
          } else {
            toast.error(data.error);
          }
        }}
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
      >
        <TextField
          type="password"
          id="password"
          fullWidth
          label="New Password"
          value={newpassword}
          onChange={(e) => setnewpassword(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ minWidth: { xs: "full", md: "200px" } }}
          type="submit"
          color="primary"
        >
          reset password
        </Button>
      </Stack>
    </Box>
  );
}
