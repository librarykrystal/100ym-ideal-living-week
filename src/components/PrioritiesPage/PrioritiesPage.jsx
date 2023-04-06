import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import "./styles.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function PrioritiesPage() {

  const categories = useSelector(store => store.categories);
  const history = useHistory();
  const dispatch = useDispatch();

  // Dispatch to GET the list of unordered categories happens back in app.jsx

  // React state to track order of items
  const [itemList, setItemList] = useState(categories);

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
  };

  // bundling of ranked user input:
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


  return (
    <div className="priority-container">


      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {itemList.map((item, index) => (
                <Draggable key={item.name} draggableId={item.name} index={index}>
                  {(provided) => (
                    <div
                      className="item-container"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default PrioritiesPage;