import { useState } from "react";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState([{ value: "" }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState({ images: [], videos: [], sounds: [] });

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  const handleMediaChange = (type, index, event) => {
    const newMedia = { ...media };
    newMedia[type][index] = event.target.files[0]?.name || "";
    setMedia(newMedia);
  };

  const addMediaField = (type) => {
    setMedia({ ...media, [type]: [...media[type], ""] });
  };

  const removeMediaField = (type, index) => {
    const newMedia = { ...media };
    newMedia[type] = newMedia[type].filter((_, i) => i !== index);
    setMedia(newMedia);
  };

  const addInputField = () => {
    setInputs([...inputs, { value: "" }]);
  };

  const removeInputField = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Title: ${title}\nDescription: ${description}\nInputs: ${JSON.stringify(
        inputs,
        null,
        2
      )}\nImages: ${JSON.stringify(
        media.images
      )}\nVideos: ${JSON.stringify(media.videos)}\nSounds: ${JSON.stringify(
        media.sounds
      )}`
    );
  };

  return (
    <div className="container">
      <h1 className="title">Dynamic Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          placeholder="Enter description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {inputs.map((input, index) => (
          <div
            key={index}
            className="input-group"
            style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
          >
            <input
              type="text"
              placeholder={`Input ${index + 1}`}
              value={input.value}
              onChange={(e) => handleInputChange(index, e)}
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeInputField(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addInputField}>
          + Add Input Field
        </button>

        {/* Image Fields */}
        <h3>Images</h3>
        {media.images.map((_, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleMediaChange("images", index, e)}
            />
            <button
              type="button"
              onClick={() => removeMediaField("images", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addMediaField("images")}>
          + Add Image
        </button>

        {/* Video Fields */}
        <h3>Videos</h3>
        {media.videos.map((_, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleMediaChange("videos", index, e)}
            />
            <button
              type="button"
              onClick={() => removeMediaField("videos", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addMediaField("videos")}>
          + Add Video
        </button>

        {/* Sound Fields */}
        <h3>Sounds</h3>
        {media.sounds.map((_, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleMediaChange("sounds", index, e)}
            />
            <button
              type="button"
              onClick={() => removeMediaField("sounds", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addMediaField("sounds")}>
          + Add Sound
        </button>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
