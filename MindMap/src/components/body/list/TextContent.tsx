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
