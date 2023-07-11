import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../images/sar.png';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

function Home() {
  const [imagePreview, setImagePreview] = useState(image);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [styles, setStyles] = useState({ height: "50vh" });
  const [cloudResponse, setCloudResponse] = useState({});
  const [saveDisable , setSaveDiable] = useState(true)
  const navigate = useNavigate();


  var file;

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const handleImageChange = (e) => {
    file = e.target.files[0];
    processSelectedFile(file);
  };

  const handleDroppedFile = (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    processSelectedFile(file);
  };

  const processSelectedFile = (file) => {
    setStyles({ height: "50vh" });
    setResult(null)
    setSaveDiable(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setSelectedFile(file);
  };

  const prev = () => {
    setImagePreview(image);
    setSelectedFile(null);
    setResult(null)
    setSaveDiable(true);
    setStyles({ height: "50vh" });
  };


  //---------------------------------Uploading on Cloudinary------------------------------------------------

  const uploadCloudinary = async () => {

    if (selectedFile) {
      const cloudName = 'dzxg41hqi';
      const uploadPreset = 'diabeticRetinopathy';

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', uploadPreset);

      try {
        const responseCloudinary = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
          method: 'POST',
          body: formData
        });

        setCloudResponse(await responseCloudinary.json());
        // console.log(await responseCloudinary.json())

      } catch (error) {
        console.error('Error uploading image:', error);
      }

    }
  }

  //----------------------------------Adding History------------------------------------------------------

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:4000/api/history/addhistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ url: cloudResponse.secure_url, result, public_id: cloudResponse.public_id })
      });

      toast.success("Result saved successfully", { autoClose: 2000 });
    } catch (error) {
      console.log(error);
    }
  }

  //-----------------------------------Predict Button-----------------------------------------------

  const handleFormSubmit = async (event) => {

    event.preventDefault();

    if (!selectedFile) {
      toast.error("Select a file first", { autoClose: 2000 });
      setStyles({ height: "50vh" });
      return;
    }

    setResult('Loading...')

    setStyles({
      height: "50vh",
      filter: "blur(5px)",
    });

    try {

      await uploadCloudinary();

      const predictData = new FormData();
      predictData.append('file', selectedFile);


      fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: predictData,
      })
        .then((response) => response.json())
        .then((data) => {
          setResult(data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setSaveDiable(false);

  };

  //-----------------------------------Dragging Function---------------------------------------------

  const draggingOver = (e) => {
    e.preventDefault();
  };

  const dragDropped = (e) => {
    e.preventDefault();
    handleDroppedFile(e);
  };

  //-------------------------------------------------------------------------------------------------

  return (
    <div className="homeMain">
      <Navbar />

      <div>
        <div className="homeHead" >
          <h1>Detection Page</h1>
        </div>


        <div className="homeContainer">
          <div className="predictText" style={{ fontFamily: "Times New Roman", fontSize: "6.5em" }}>
            {result && <p>{result.charAt(0).toUpperCase() + result.slice(1)}</p>}
          </div>
          <div className="homeImage" onDragOver={draggingOver} onDrop={dragDropped}>
            <div className="mb-4 d-flex justify-content-center">
              {imagePreview && <img src={imagePreview} alt="Preview" style={styles} />}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="d-flex justify-content-center">
            <div className="btn btn-primary btn-rounded">
              <label className="form-label text-white m-1" htmlFor="customFile1" style={{ cursor: "pointer" }}>Choose file</label>
              <input
                type="file"
                className="form-control d-none"
                id="customFile1"
                onChange={(e) => {
                  if (e.target.files.length) {
                    handleImageChange(e);
                  }
                }}
              />
            </div>
          </div>
          <div className="btn btn-primary btn-rounded mx-3" onClick={handleFormSubmit}>
            <label className="form-label text-white m-1" style={{ cursor: "pointer" }}>Predict</label>
          </div>

          <div className={`btn btn-primary btn-rounded ${!saveDisable ? '' : 'disabled'} `} onClick={handleSave}>
            <label className="form-label text-white m-1" style={{ cursor: "pointer" }}>Save</label>
          </div>

          <div className="d-flex justify-content-center mx-3">
            <div className="btn btn-danger btn-rounded" onClick={prev}>
              <label className="form-label text-white m-1" style={{ cursor: "pointer" }}>Clear file</label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
