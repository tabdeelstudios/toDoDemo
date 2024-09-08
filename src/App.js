import { useState, useEffect } from "react";
import axios from "axios";
// import "./App.css";

function App() {
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/todoapi/notes/"
        );
        setAllNotes(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [deleteMessage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : ${error}</div>;

  const handleDelete = async (id) => {
    const response = await axios.delete(
      "http://127.0.0.1:8000/todoapi/notes/delete/" + id + "/"
    );

    setDeleteMessage(response.data);
  };

  return (
    <div className="App">
      <p>{deleteMessage}</p>
      <h1>All Notes</h1>
      <div style={{ padding: "20px" }}>
        {allNotes.map((note) => (
          <div key={note.id} style={{ display: "flex", margin: "20px" }}>
            <p>{note.body}</p>
            <button>Edit</button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
