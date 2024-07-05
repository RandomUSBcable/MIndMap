/*
const TheNoteList = ["a1", "b1", "c1", ["a2", ["a3", "b3"], "b2", "c2"]];


let TheNoteList1: JSON = {item:"This", child:[
  { item: "a1", child: [] },
  { item: "b1", child: [] },
  {
    item: "c1",
    child: [
      {
        item: "a2",
        child: [
          { item: "a3", child: [] },
          { item: "b3", child: [] },
        ],
      },
      { item: "b2", child: [] },
      { item: "c2", child: [] },
    ],
  }
]};
import SortTheNoteList from "./SortTheNoteList";

function TextContent() {
  return <SortTheNoteList AList={TheNoteList1} />;
}

/*
function TextContent() {
  return <ul className="TextContent"></ul>;
}
*/

/*
interface Item {
  id: number;
  name: string;
  children?: Item[];
}

import SortTheNoteList from "./SortTheNoteList";

const TextContent: React.FC = () => {
  // Example data structure
  const data: Item = {
    id: 0,
    name: "TITLE",
    children: [
      {
        id: 1,
        name: "This thing",
        children: [
          {
            id: 111,
            name: "Is an indented",
            children: [],
          },
        ],
      },
      {
        id: 2,
        name: "List ",
        children: [],
      },
      {
        id: 3,
        name: "Made with",
        children: [
          {
            id: 31,
            name: "a lotta time, like a lotta lotta time",
            children: [],
          },
        ],
      },
    ],
  };



  return (
    <div>
      <SortTheNoteList item={data} />
    </div>
  );
};

export default TextContent;
*/

/*
interface ListItem {
  id: number;
  name: string;
  children?: ListItem[];
}

import React, { useState } from "react";
import SortTheNoteList from "./SortTheNoteList";

const TextContent: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([
    {
      id: 0,
      name: "TITLE",
      children: [
        {
          id: 1,
          name: "Item 1",
          children: [
            {
              id: 11,
              name: "Item 1.1",
              children: [
                { id: 111, name: "Item 1.1.1" },
                { id: 112, name: "Item 1.1.2" },
              ],
            },
            {
              id: 12,
              name: "Item 1.2",
            },
          ],
        },
        {
          id: 2,
          name: "Item 2",
        },
      ],
    },
  ]);

  const generateId = (parentId: number) => {
    const TheNewID: number = parentId * 10 + 1;
    return TheNewID;
  };

  const callForNewItem = () => {}

  const addItem = (parentId: number) => {
    let newId: number = generateId(parentId);
    const newName = prompt("Enter new item name") || `Item ${newId}`;

    const addItemRecursively = (
      items: ListItem[],
      parentId: number
    ): ListItem[] => {
      return items.map((item) => {
        if (item.id === parentId) {
          if (item.children) {
            newId += item.children?.length;
          }
          return {
            ...item,
            children: item.children
              ? [...item.children, { id: newId, name: newName }]
              : [{ id: newId, name: newName }],
          };
        }

        return item.children
          ? { ...item, children: addItemRecursively(item.children, parentId) }
          : item;
      });
    };

    setData(addItemRecursively(data, parentId));
  };

  const removeItem = (id: number) => {
    if (id == 0) {
      return null;
    }
    const removeItemRecursively = (
      items: ListItem[],
      id: number
    ): ListItem[] => {
      return items
        .filter((item) => item.id !== id)
        .map((item) =>
          item.children
            ? { ...item, children: removeItemRecursively(item.children, id) }
            : item
        );
    };

    setData(removeItemRecursively(data, id));
  };

  return (
    <div>
      <SortTheNoteList items={data} onAdd={addItem} onRemove={removeItem} />
    </div>
  );
};

export default TextContent;
*/

interface ListItem {
  id: number[];
  name: string;
  children: ListItem[];
}

import React, { Children, useState } from "react";
import SortTheNoteList from "./SortTheNoteList";

const InitialList: ListItem[] = [
  {
    id: [0],
    name: "TITLE",
    children: [
      {
        id: [1],
        name: "Heading",
        children: [
          {
            id: [1, 1],
            name: "SubHeading",
            children: [
              { id: [1, 1, 1], name: "Item 1", children: [] },
              { id: [1, 1, 2], name: "Item 2", children: [] },
            ],
          },
          {
            id: [1, 2],
            name: "Another SubHeading",
            children: [],
          },
        ],
      },
      {
        id: [2],
        name: "Another Heading",
        children: [],
      },
    ],
  },
];

interface StoredListType {
  name: string;
  id: number[];
  numberOfChildren: number;
}

const Deconstruct = (
  TextToBeStored: ListItem[],
  FinalList: StoredListType[] = [],
  idList: number[] = []
) => {
  TextToBeStored.map((item) => {
    //idList.push(item.id % 10);

    //if (item.id[1] === 1) {
    //  idList = [1];
    //}

    FinalList.push({
      name: item.name,
      id: item.id,
      numberOfChildren: item.children.length || 0,
    });

    if (item.children) {
      Deconstruct(item.children, FinalList, idList);
    }
  });

  return FinalList;
};

const BuildListFromStorage = (
  StoredText: StoredListType[],
  BuiltList: ListItem[] = []
) => {
  let countLeft = StoredText.length;
  StoredText.map((item) => {
    if (item.id[0] === 0) {
      BuiltList.push({
        id: item.id,
        name: item.name,
        children: [],
      });
    } else {
      const PushItemsrecursively = (
        ListToBeBuilt: ListItem[],
        IndexNumber: number = 0
      ) => {
        if (IndexNumber + 1 === item.id.length) {
          //ListToBeBuilt[item.id[IndexNumber]].children.push({
          ListToBeBuilt.push({
            name: item.name,
            id: item.id,
            children: [],
          });
          console.log(item.id, IndexNumber);
        } else {
          PushItemsrecursively(
            ListToBeBuilt[item.id[IndexNumber] - 1].children,
            IndexNumber + 1
          );
        }
      };
      PushItemsrecursively(BuiltList[0].children);
    }
    //if (item.numberOfChildren>0){
    //
    //  }
    //  BuiltList.push({
    //   id: item.id,
    //   name: item.name,
    //   children: [],
    // });
  });
  return BuiltList;
};

/*
const ListToBeStored: StoredListType[] = [
  {
    name: "a",
    id: 10,
  },
  {
    name: "b",
    id: 11,
  },
];
*/

const ListToBeStored: StoredListType[] = Deconstruct(InitialList);

console.log("%j", ListToBeStored);

localStorage.setItem("List", JSON.stringify(ListToBeStored));
let NewList = JSON.parse(localStorage.getItem("List") || "{}");
const NewList2: ListItem[] = BuildListFromStorage(NewList);

const TextContent: React.FC = () => {
  const [data, setData] = useState<ListItem[]>(NewList2);

  const generateId = (parentId: number[]) => {
    parentId.push(1);
    return parentId;
  };
  /*
  const callForNewItem = () => {
    return (
      <>
        <TextField FilledText="" />
      </>
    );
  };
*/
  const addItem = (parentId: number[]) => {
    let newId: number[] = generateId(parentId);
    let newName = "";

    const addItemRecursively = (
      items: ListItem[],
      parentId: number[]
    ): ListItem[] => {
      return items.map((item) => {
        if (item.id === parentId) {
          if (item.children) {
            newId[newId.length - 1] += item.children.length;
          }
          return {
            ...item,
            children: item.children
              ? [...item.children, { id: newId, name: newName, children: [] }]
              : [{ id: newId, name: newName, children: [] }],
          };
        }

        return item.children
          ? { ...item, children: addItemRecursively(item.children, parentId) }
          : item;
      });
    };

    setData(addItemRecursively(data, parentId));
  };

  const removeItem = (id: number[]) => {
    if (id[1] == 0) {
      return null;
    }
    const removeItemRecursively = (
      items: ListItem[],
      id: number[]
    ): ListItem[] => {
      return items
        .filter((item) => item.id !== id)
        .map((item) =>
          item.children
            ? { ...item, children: removeItemRecursively(item.children, id) }
            : item
        );
    };

    setData(removeItemRecursively(data, id));
  };

  return (
    <div>
      <SortTheNoteList items={data} onAdd={addItem} onRemove={removeItem} />
    </div>
  );
};

export default TextContent;
