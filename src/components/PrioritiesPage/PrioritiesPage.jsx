import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import "./styles.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import "@fontsource/roboto-slab";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


// Material UI Font Theming
const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto Slab',
    ],
  },
});


function PrioritiesPage() {

  const categories = useSelector(store => store.categories);
    // Dispatch to GET the list of unordered categories happens in app.jsx
  const history = useHistory();
  const dispatch = useDispatch();

  // Local state to track order of items
  const [itemList, setItemList] = useState(categories);

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore if dropedp outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update state array
    setItemList(updatedList);
  };

  // bundling of ranked user input for dispatch:
  const rankedList = [
    {rank: 1, category_id: parseInt(`${itemList[0].id}`)},
    {rank: 2, category_id: parseInt(`${itemList[1].id}`)},
    {rank: 3, category_id: parseInt(`${itemList[2].id}`)},
    {rank: 4, category_id: parseInt(`${itemList[3].id}`)},
    {rank: 5, category_id: parseInt(`${itemList[4].id}`)},
    {rank: 6, category_id: parseInt(`${itemList[5].id}`)},
    {rank: 7, category_id: parseInt(`${itemList[6].id}`)},
    {rank: 8, category_id: parseInt(`${itemList[7].id}`)},
    {rank: 9, category_id: parseInt(`${itemList[8].id}`)},
    {rank: 10, category_id: parseInt(`${itemList[9].id}`)}
  ]

  console.log('RANKED:', rankedList);

  let sat;

  const saturation = (item) => {
    if (item.id == 1){
      sat == 100;
      return item;
    } else if (item.id == 2) {
      sat == 90;
      return item;
    }
    console.log('SAT:', sat);
  }

  // Handles SAVE - - - submits ranked priorities to database
  const saveAnswers = () => {
    console.log('SAVE clicked');
    dispatch({
        type: 'SET_PRIORITIES',
        payload: rankedList
      });
  }

  return (
    <ThemeProvider theme={theme}>
    <div>
      <center>
        <Typography variant="h4" mt={0} mb={1} gutterBottom>PRIORITIES PAGE</Typography>
        <Typography variant="body1" mb={6} gutterBottom>Drag and drop the categories below to prioritize them, highest priority to lowest.</Typography>
        
        <div className="priority-container">
          <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
              {(provided) => (
                <div
                  className="list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {itemList
                  // .filter(saturation)
                  .map((item, index) => (
                    <Draggable key={item.name} draggableId={item.name} index={index}>
                      {(provided) => (
                        <Box
                          className="item-container"
                          sx={{
                            width: 250,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            m: 1,
                            // backgroundColor: '#7895ed',
                            backgroundColor: `hsl(225, ${80-index*10}%, 65%)`,
                            // backgroundColor: `hsl(225, ${item.id*5}%, 65%)`,
                            // opacity: `0.${index}`,
                            '&:hover': {
                              backgroundColor: '#bdbfbf',
                              opacity: [0.9, 0.8, 0.7],
                            },
                          }}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <Typography>{item.name}</Typography>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <br/><br/>

        {/* SAVE button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          onClick={saveAnswers}>SAVE PRIORITIES
        </Button>
      <br/><br/>

    </center>
  </div>
  </ThemeProvider>
  );
}

export default PrioritiesPage;