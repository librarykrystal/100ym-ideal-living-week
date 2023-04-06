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

  // console.log('CATEGORIES FROM DB:', categories);

  // const hardcodedTest = [
  //   {id: 1, name: 'Sleep'},
  //   {id: 2, name: 'Self-Care'},
  //   {id: 3, name: 'Family and Relationships'},
  //   {id: 4, name: 'Personal Development'},
  //   {id: 5, name: 'Nutrition'},
  //   {id: 6, name: 'Leisure Time'},
  //   {id: 7, name: 'Community Involvement'},
  //   {id: 8, name: 'Creativity'},
  //   {id: 9, name: 'Work'},
  //   {id: 10, name: 'Measure What Matters'}

  // ]

  // React state to track order of items
  const [itemList, setItemList] = useState(categories);

  // console.log('LIST:', itemList);
  // console.log('DATA for i[0]:', itemList[0]);

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

  const rankedList = [
    {rank: 1, category_id: parseInt(`${itemList[0].id}`)},
    {rank: 2, category_id: parseInt(`${itemList[1].id}`)}
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