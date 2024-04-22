import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Stack,
  IconButton,
} from "@mui/material";
import {
  Delete,
  DeleteForever,
  Edit,
  WarningRounded,
} from "@mui/icons-material";
import Modal from "@mui/joy/Modal";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import ModalDialog from "@mui/joy/ModalDialog";
import AddNewMeal from "../addNewMeal/addNewMeal";

const FoodCard = ({ foodData }: any) => {
  const [deleteDialog, setDelete] = useState(false);
  const [editDialog, setEdit] = useState(false);

  const closeDialog = () => {
    setDelete(false);
    setEdit(false);
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: 4,
          marginBottom: "20px",
          marginLeft: "5px",
        }}
      >
        <CardActionArea>
          <CardMedia
            image={foodData.photoUrl}
            title={foodData.name}
            sx={{ height: 200 }}
          />
          <CardContent sx={{ padding: "16px 24px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" component="h3">
                {foodData.name}
              </Typography>
            </Stack>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {foodData.description}
            </Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2">Ingredients:</Typography>
                <ol style={{ paddingLeft: 20, marginTop: 0.5 }}>
                  {foodData.ingredients.map((ingredient: any, index: number) => (
                    <li key={index}>{ingredient.value}</li>
                  ))}
                </ol>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {" "}
              {/* New Stack for cook time */}
              {foodData.cookTime && (
                <Typography variant="body2" color="textSecondary">
                  Cook: {foodData.cookTime} min
                </Typography>
              )}
            </Stack>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton aria-label="edit" onClick={() => setEdit(true)}>
                <Edit />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => setDelete(true)}>
                <Delete />
              </IconButton>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>

      <Modal open={deleteDialog || editDialog} onClose={closeDialog}>
        <ModalDialog variant="outlined" role="alertdialog">
          {deleteDialog ? (
            <>
              <DialogTitle>
                <WarningRounded />
                Confirmation
              </DialogTitle>
              <Divider />
              <DialogContent>Are you sure you want to delete?</DialogContent>
              <DialogActions>
                <Button
                  variant="solid"
                  color="danger"
                  onClick={() => setDelete(false)}
                >
                  Delete
                </Button>
                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() => setDelete(false)}
                >
                  Cancel
                </Button>
              </DialogActions>
            </>
          ) : (
            <>
            <AddNewMeal foodCard={{...foodData, id: 1}}/>
            <DialogActions>
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() => setEdit(false)}
                >
                  Update
                </Button>
                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </Button>
              </DialogActions>
            </>
          )}
        </ModalDialog>
      </Modal>
    </>
  );
};

export default FoodCard;
