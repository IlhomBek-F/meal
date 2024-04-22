import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import "./addNewMeal.css";
import { useFieldArray, useForm } from "react-hook-form";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { addNewMealToServer } from "../../service";

export default function AddNewMeal(props: any) {
  const {
    name = "",
    cookTime = "",
    ingredients = [{ value: "" }],
    description = "",
    id = "",
  } = props.foodCard || {};
  const [inputName, setName] = useState<string>(name);
  const [inputDescription, setDecription] = useState<string>(description);
  const navigate = useNavigate();

  const { register, control, handleSubmit, reset, trigger, setError } =
    useForm<any>({
      defaultValues: {
        ingredients: ingredients,
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const [times, setTime] = useState(cookTime);

  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };

  const addNewMeal = () => {
    const id = "id" + Math.random().toString(16).slice(2);

    const data = {
      id,
      name: inputName,
      ingredients: fields,
      description: inputDescription,
      cookTime: times,
    };

    addNewMealToServer(data)
      .then((data) => {
        console.log(data);
      })
      .catch(console.log);
  };
  return (
    <div className="main">
      {!id && (
        <>
          <Button
            variant="outlined"
            style={{ marginBottom: "20px" }}
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          <Button
            variant="contained"
            style={{ marginBottom: "20px", marginLeft: "10px" }}
            onClick={addNewMeal}
          >
            Save
          </Button>
        </>
      )}

      <Card sx={{ maxWidth: "60rem" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div className="container">
            <div className="container__photo">
              <img src="https://tse3.mm.bing.net/th?id=OIP.RqFWzaZfizWbu-DOEsIL8wHaFW&pid=Api&P=0&h=220" />
            </div>
            <div className="container__form">
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <TextField
                  label="Name"
                  id="fullWidth"
                  size="small"
                  value={inputName}
                  fullWidth
                  onChange={(e) => setName(e.currentTarget.value)}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Time</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={times}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={45}>45</MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                  </Select>
                </FormControl>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                  <ol style={{ width: "100%" }}>
                    {fields.map((item, index) => (
                      <li key={item.id} style={{ margin: "10px 0" }}>
                        <div style={{ display: "flex" }}>
                          <TextField
                            label="Ingredient"
                            id="fullWidth"
                            size="small"
                            fullWidth
                            {...register(`ingredients.${index}.value`)}
                          />
                          <IconButton
                            aria-label="delete"
                            onClick={() => remove(index)}
                          >
                            <Delete />
                          </IconButton>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <Button size="small" onClick={() => append("")}>
                    Add new ingredient
                  </Button>
                </form>
              </div>

              <Input
                style={{
                  position: "absolute",
                  width: "25%",
                  top: "195px",
                }}
                value={inputDescription}
                onChange={(e) => setDecription(e.currentTarget.value)}
                maxRows={5}
                aria-label="Demo input"
                multiline
                placeholder="Description"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
