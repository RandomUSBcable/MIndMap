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

interface Item {
  id: number;
  name: string;
  children?: Item[];
}

interface ItemProps {
  item: Item;
}

const SortTheNoteList: React.FC<ItemProps> = ({ item }) => {
  return (
    <ul>
      <div className="NoteHolder" onClick={() => console.log("clicked")}>
        <li className="Note" key={item.id}>
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
