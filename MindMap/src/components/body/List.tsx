import TextContent from "./list/TextContent.tsx";
import NewText from "./list/NewText.tsx";

function List() {
  return (
    <div className="List" style={{ padding: "2vh" }}>
      <TextContent />
      <NewText />
    </div>
  );
}

export default List;
