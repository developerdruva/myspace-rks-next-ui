import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";

function Sample() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Username" fullWidth margin="normal" />
        )}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default Sample;
