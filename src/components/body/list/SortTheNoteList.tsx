//interface RecursiveArray<T> {
//    [index: number]: T | RecursiveArray<T>;
//  }
//
//type RArray = RecursiveArray<string>;
/*
const TheNoteList1 = ["a1", "b1", "c1"];
/*
const SortTheNoteList = (AList: any) => {
  return (
    <ul>
      {AList.map((note: any) =>
        !Array.isArray(note) ? (
          <div className="Note" onClick={() => console.log("clicked")}>
            <li>{note}</li>
          </div>
        ) : (
          <></>
        )
      )}
    </ul>
  );
};

const SortTheNoteList = () => {
    return (
      <ul>
        {TheNoteList1.map((note: any) => (
          <div className="Note" onClick={() => console.log("clicked")}>
            <li>{note}</li>
          </div>
        ))}
      </ul>
    );
  };
*/

//const TheNoteList1 = ["a1", "b1", "c1"];
/*
const SortTheNoteList = () => {
  return (
    <ul>
      {TheNoteList1.map((note: any) => (
        <div className="Note" onClick={() => console.log("clicked")}>
          <li>{note}</li>
        </div>
      ))}
    </ul>
  );
};
*/

/*
interface Item {
  id: number;
  name: string;
  children?: Item[];
}

interface ItemProps {
  item: Item;
}

const showItem = () => {};

const SortTheNoteList: React.FC<ItemProps> = ({ item }) => {
  return (
    <ul>
      <div className="NoteHolder" onClick={() => console.log("clicked")}>
        <li className="Note" key={item.id} onClick={showItem}>
          {item.name}
        </li>
        {item.children &&
          item.children.map((child) => (
            <SortTheNoteList key={child.id} item={child} />
          ))}
      </div>
    </ul>
  );
};

export default SortTheNoteList;
*/

/*
import React, { useState } from "react";

interface ListItem {
  id: number;
  name: string;
  children?: ListItem[];
}

interface RecursiveListProps {
  items: ListItem[];
  onAdd: (parentId: number) => void;
  onRemove: (id: number) => void;
}

const SortTheNoteList: React.FC<RecursiveListProps> = ({
  items,
  onAdd,
  onRemove,
}) => {
  return (
    <ul>
      {items.map((item) => (
        <div className="NoteHolder">
          <div className="NoteAndButton">
            <li
              key={item.id}
              className="Note"
              onClick={() => {
                const EditedName = prompt("Edit Name") || item.name;
                item.name = EditedName;
              }}
            >
              {item.name}
            </li>
            <div className="EditButtons">
              <button className="Button" onClick={() => onAdd(item.id)}>
                e
              </button>
              <button className="Button" onClick={() => onAdd(item.id)}>
                +
              </button>
              <button className="Button" onClick={() => onRemove(item.id)}>
                -
              </button>
            </div>
          </div>
          <div className="NextNote">
            {item.children && item.children.length > 0 && (
              <SortTheNoteList
                items={item.children}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            )}
          </div>
        </div>
      ))}
    </ul>
  );
};

export default SortTheNoteList;
*/

import TextField from "./TextField";

interface ListItem {
  id: number[];
  name: string;
  children?: ListItem[];
}

interface RecursiveListProps {
  items: ListItem[];
  onAdd: (parentId: number[]) => void;
  onRemove: (id: number[]) => void;
}

const HandleClick = (item: ListItem) => {
  console.log(item.id);
  return <TextField FilledText={item.name} />;
};

const SortTheNoteList: React.FC<RecursiveListProps> = ({
  items,
  onAdd,
  onRemove,
}) => {
  return (
    <ul>
      {items.map((item) => (
        <div className="NoteHolder">
          <div className="NoteAndButton">
            <li
              //key={item.id}
              className="Note"
              onClick={() => HandleClick(item)}
            >
              <TextField FilledText={item.name} />
            </li>
            <div className="EditButtons">
              <button className="Button" onClick={() => onAdd(item.id)}>
                e
              </button>
              <button className="Button" onClick={() => onAdd(item.id)}>
                +
              </button>
              <button className="Button" onClick={() => onRemove(item.id)}>
                -
              </button>
            </div>
          </div>
          <div className="NextNote">
            {item.children && item.children.length > 0 && (
              <SortTheNoteList
                items={item.children}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            )}
          </div>
        </div>
      ))}
    </ul>
  );
};

export default SortTheNoteList;
