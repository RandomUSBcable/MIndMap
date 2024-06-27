function TextContent() {
  const TheNoteList = ["abcdefghijklm", "b", "c"];

  return (
    <ul className="TextContent">
      {TheNoteList.map((note) => (
        <div className="Note" onClick={() => console.log("clicked")}>
          <li>{note}</li>
        </div>
      ))}
    </ul>
  );
}

export default TextContent;
