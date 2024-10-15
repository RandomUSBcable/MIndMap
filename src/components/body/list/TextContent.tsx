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
        id: [2],
        name: "Heading",
        children: [
          {
            id: [2, 2],
            name: "SubHeading",
            children: [
              { id: [2, 2, 2], name: "Item 1", children: [] },
              { id: [2, 2, 1], name: "Item 2", children: [] },
            ],
          },
          {
            id: [2, 1],
            name: "Another SubHeading",
            children: [],
          },
        ],
      },
      {
        id: [1],
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

//im storing this in reverse order so its easier to construct.
const Deconstruct = (
  TextToBeStored: ListItem[],
  FinalList: StoredListType[] = [],
  idList: number[] = []
) => {
  TextToBeStored.reverse().map((item) => {
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

/*

const BuildListFromStorage = (
  StoredText: StoredListType[],
  BuiltList: ListItem[] = []
) => {
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
        console.log(item.id);
        console.log(BuiltList);

        if (IndexNumber + 1 === item.id.length) {
          //ListToBeBuilt[item.id[IndexNumber]].children.push({
          return (ListToBeBuilt = [
            { name: item.name, id: item.id, children: [] },
            ...ListToBeBuilt,
          ]);
          console.log(item.id[IndexNumber], "dome");
          console.log(ListToBeBuilt);
          console.log(BuiltList);
        } else {
          return PushItemsrecursively(
            ListToBeBuilt[ListToBeBuilt.length - item.id[IndexNumber] + 1]
              .children,
            IndexNumber + 1
          );
        }
      };
      PushItemsrecursively(BuiltList[0].children);
      console.log(BuiltList);
    }
  });
  return BuiltList;
};

*/

const BuildListFromStorage = (
  StoredText: StoredListType[],
  BuiltList: ListItem[] = []
) => {
  StoredText.map((item) => {
    if (item.id[0] == 0) {
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
          console.log("done", item.id, ListToBeBuilt);
          ListToBeBuilt.unshift({
            id: item.id,
            name: item.name,
            children: [],
          });
        } else {
          console.log(ListToBeBuilt[item.id[IndexNumber] - 1]);
          PushItemsrecursively(
            ListToBeBuilt[ListToBeBuilt.length - item.id[IndexNumber]].children,
            IndexNumber + 1
          );
        }
      };
      PushItemsrecursively(BuiltList[0].children);
    }
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
console.log("LIST TO BE STORED: ", ListToBeStored);

localStorage.setItem("List", JSON.stringify(ListToBeStored));
let NewList = JSON.parse(localStorage.getItem("List") || "{}");
const NewList2: ListItem[] = BuildListFromStorage(NewList);

const TextContent: React.FC = () => {
  const [data, setData] = useState<ListItem[]>(NewList2);

  const addItem = (parentID: number[], fullList: ListItem[] = data) => {
    console.log("Adding item....");
    const addItemRecursively = (item: ListItem, IndexCount: number = 0) => {
      if (item.id[0] != 0 && item.id.length == parentID.length) {
        const newID = [...parentID, item.children.length];
        //item.children.unshift({ name: "", id: newID, children: [] });
        item.children = [
          { name: "", id: newID, children: [] },
          ...item.children,
        ];
        console.log("Added item");
        return [...fullList];
      } else {
        addItemRecursively(
          item.children[item.children.length - parentID[IndexCount]]
        );
      }
    };
    setData(addItemRecursively(data[0]) || data);
  };

  /*

  const addItem = (parentId: number[]) => {
    let newId: number[] = generateId(parentId);
    let newName = "";

    const FullAdder = (fullList: ListItem[]) => {
      console.log("FullAdder");
      const addItemRecursively = (item: ListItem, IndexCount: number = 0) => {
        if (item.id.length === newId.length - 1 && item.id[0] != 0) {
          console.log("enter ", item.id, IndexCount);
          item.children = [
            { name: newName, id: newId, children: [] },
            ...item.children,
          ];
        } else {
          console.log("abc ", IndexCount);
          addItemRecursively(
            item.children[newId[IndexCount] - 1],
            IndexCount + 1
          );
          let childCount = 1;
          item.children.map((child) => {
            child.id[child.id.length - 1] = childCount;
            childCount++;
          });
        }
        return item;
      };
      addItemRecursively(fullList[0]);
      {
        return [...fullList];
      }
    };

    setData(FullAdder(data));
  };
*/

  /*
    const FullAdder = (fullList: ListItem[]) => {
      const addItemRecursively = (
        items: ListItem[],
        IndexCount: number = 0
      ) => {
        items.map((item) => {
          if (item.id[IndexCount] === newId[IndexCount]) {
            console.log("func", IndexCount, newId);
            if (item.id.length === newId.length - 1) {
              console.log("enter ", item.id);
              if (item.children) {
                let CountOfChildren = 2;
                item.children.map((subItem) => {
                  subItem.id[subItem.id.length - 1] = CountOfChildren;
                  CountOfChildren += 1;
                });

                item.children = [
                  ...item.children,
                  { name: newName, id: newId, children: [] },
                ];

                console.log(item.children.length);
                console.log(newId, newName);
              } else {
                item.children = [{ name: newName, id: newId, children: [] }];
                console.log("no children", newId);
              }
            } else {
              console.log(item.id, IndexCount);
              //return (..item, children:item)
              addItemRecursively(item.children, IndexCount + 1);
            }
          }
        });
      };
      addItemRecursively(fullList[0].children);

      */

  /*
  const callForNewItem = () => {
    return (
      <>
        <TextField FilledText="" />
      </>
    );
  };
*/

  /*
    const FullAdder = (fullList: ListItem[]) => {
    const addItemRecursively = (
      items: ListItem[],
      IndexCount: number = 0
    ): ListItem[] => {
      return items.map((item) => {
        if (item.id[IndexCount] === parentId[IndexCount]) {
        if (item.id.length === newId.length - 1){
          if (item.children) {
            //newId[newId.length - 1] += item.children.length;
            let CountOfChildren = 1;
            item.children.map((subItem) => {
              console.log(item.name, item.id, subItem.name, subItem.id);
              subItem.id[subItem.id.length - 1] = CountOfChildren;
              CountOfChildren += 1;
            });
          }

          return {
            ...item, 
            children: [...item.children, { id: newId, name: newName, children: [] }]
          };}
          else{return item.children
            ? { ...item, children: addItemRecursively(item.children, IndexCount+1) }
            : item;}
        }
        else {return items}
        
      });
    };
    addItemRecursively(fullList[0].children);
      {
        return [...fullList];
      }
    };
    */
  /*
    const FullAdder = (fullList: ListItem[]) => {
      const addItemRecursively = (
        items: ListItem[],
        IndexCount: number = 0
      ) => {
        items.map((item) => {
          if (item.id[IndexCount] === newId[IndexCount]) {
            console.log("func", IndexCount, newId);
            if (item.id.length === newId.length - 1) {
              console.log("enter ", item.id);
              if (item.children) {
                let CountOfChildren = 2;
                item.children.map((subItem) => {
                  subItem.id[subItem.id.length - 1] = CountOfChildren;
                  CountOfChildren += 1;
                });

                item.children = [
                  ...item.children,
                  { name: newName, id: newId, children: [] },
                ];

                console.log(item.children.length);
                console.log(newId, newName);
              } else {
                item.children = [{ name: newName, id: newId, children: [] }];
                console.log("no children", newId);
              }
            } else {
              console.log(item.id, IndexCount);
              //return (..item, children:item)
              addItemRecursively(item.children, IndexCount + 1);
            }
          }
        });
      };
      addItemRecursively(fullList[0].children);
      {
        return [...fullList];
      }
    };
     */

  /*

const addItemRecursively = (fullList: ListItem[]) => {
      const addItemRecursively = (
        item: ListItem,
        IndexCount: number = 0
      ) => {
          if (item.id.length === newId.length - 1) {
            console.log("enter ", item.id);
            item.children.upshift({ name: newName, id: newId, children: [] })
            }
          else{
            addItemRecursively(item.children[newid[IndexCount]]),IndexCount+1)
          }
          return(item);
}


        items.map((item) => {
          if (item.id[IndexCount] === newId[IndexCount]) {
            console.log("func", IndexCount, newId);
            if (item.id.length === newId.length - 1) {
              console.log("enter ", item.id);
              if (item.children) {
                let CountOfChildren = 2;
                item.children.map((subItem) => {
                  subItem.id[subItem.id.length - 1] = CountOfChildren;
                  CountOfChildren += 1;
                });

                item.children = [
                  ...item.children,
                  { name: newName, id: newId, children: [] },
                ];

                console.log(item.children.length);
                console.log(newId, newName);
              } else {
                item.children = [{ name: newName, id: newId, children: [] }];
                console.log("no children", newId);
              }
            } else {
              console.log(item.id, IndexCount);
              //return (..item, children:item)
              addItemRecursively(item.children, IndexCount + 1);
            }
          }
        });
      };
      addItemRecursively(fullList[0]);
      {
        return [...fullList];
      }
    };
    setData(FullAdder(data));
  };
*/

  /*
    const FullAdder = (ListToBeAddedHere: ListItem[]) => {
      const AddItemRecursively = (
        ListToBeAdded: ListItem[],
        IndexNumber: number = 0
      ) => {
        console.log(IndexNumber);
        if (IndexNumber + 1 === newId.length) {
          //ListToBeBuilt[item.id[IndexNumber]].children.push({
          console.log(IndexNumber);
          ListToBeAdded.push({
            name: newName,
            id: newId,
            children: [],
          });
        } else {
          AddItemRecursively(
            ListToBeAdded[newId[IndexNumber] - 1].children,
            IndexNumber + 1
          );
        }
      };
      AddItemRecursively(ListToBeAddedHere[0].children);
      return data;
    };

    setData(FullAdder(data) || InitialList);
  };
*/
  const removeItem = (id: number[]) => {
    if (id[0] == 0) {
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
