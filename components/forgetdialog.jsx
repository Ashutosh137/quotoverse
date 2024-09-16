"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";

export default function FormDialog({ toggle, open }) {
  const [email, setemail] = React.useState("");

  const handleClose = () => {
    toggle();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const data = await fetch(
              `${window.origin}/profile/forgetpassword`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              },
            ).then((res) => res.json());

            if (data?.error) {
              toast.error(data?.error);
            } else {
              toast.success(data.message);
            }
            toggle();
            setemail("");
          },
        }}
      >
        <DialogTitle>forget password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password , please enter your email address here. We
            will send a link to your registered email address occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">send email</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
