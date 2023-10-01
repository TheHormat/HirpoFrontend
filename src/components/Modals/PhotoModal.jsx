import React from "react";
import { useState, useRef } from "react";
// import userpanel from "../images/userpanel.png";
import "./modals.css";
function PhotoModal({ setPhotoModal,id }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);

  };
  
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleFormSubmit = async (event) => {



    const formDataObj = new FormData()
    formDataObj.append('file',file)
    formDataObj.append('data',id)
    const a = await fetch("http://127.0.0.1:8000/wizard/ChangePPView/", {
      method: "POST",
      mode: "cors",

      body: formDataObj,
    })
      .then((a) => a.json())
      .then((a) => a);
    setPhotoModal(false)

  };
  
  return (
    <div className={`modalWrapper open`}>
      <div className="resetModal">
        <form onSubmit={handleFormSubmit} id="photoModal">
          <label htmlFor="upload" id="uploadText">
            Click and Upload your photo
          </label>
          <input
            id="upload"
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
          <div className="user-image" onClick={handleImageClick}>
            <img src={userpanel} alt="Upload Image" />
          </div>
          <div className="resetmodal-btns">
            <button className="reset-cancel" onClick={() => setPhotoModal(false)}>
              Cancel
            </button>
            <button type="submit" id="upload">
              Save Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PhotoModal;
