import React from 'react';
import "./Change.css"
import { useState, useEffect } from 'react';
import asse from "../assets/asset12.jpg"
import { Dialog } from 'primereact/dialog';
import Avatar from 'react-avatar-edit'
// import CreatableSelect from "react-select/creatable"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

// const components = {
//   DropdownIndicator: null
// }

// const createOption = label => ({
//   label,
//   value: label
// })


const Change = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const gmi = localStorage.getItem('gmi');
  const id = localStorage.getItem('id');

  const [profileData, setProfileData] = useState({ firstName: "", lastName: "", image: "", email: "", assistiveDevice: "", dateOfBirth: "", disabilityType: "", education: "", gender: "", mobileNumber: "", institute: "", udid: "", skills: "" })
  useEffect(() => {
    fetchProfile();
    // Fetch use profile when token is available
  }, [token]);

  const fetchProfile = async () => {
    try {
      console.log(token);
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/profile/getuserdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      const data = await response.json();

      const { firstName, lastName, image, email, assistiveDevice, dateOfBirth, disabilityType, education, gender, mobileNumber, institute, udid, skills } = data.data;

      localStorage.setItem("gmi", image)


      setProfileData({
        firstName, lastName, image, email, assistiveDevice, dateOfBirth, disabilityType, education, gender, mobileNumber, institute, udid, skills
      });
      // console.log(image);
      // console.log(firstName);
      // console.log(lastName);
      // // console.log(name);
      // console.log(email);
      // console.log(assistiveDevice);
      // console.log(dateOfBirth);
      // console.log(disabilityType);
      // console.log(education);
      // console.log(gender);
      // console.log(mobileNumber);
      // console.log(institute);
      // console.log(udid);
      // console.log(skills);

    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  const profileHandler = (event) => {
    const { name, value } = event.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const id = localStorage.getItem('id');
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/profile/updateprofile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profileData,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Handle success, e.g., show a success message or redirect
        toast.success("Profile updated successfully")
        navigate(0)
        window.scrollTo(0, 0);
        // console.log("Profile updated successfully");
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to update profile:", data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };






  // const [inputValue, setInputValue] = useState("")
  // const [value, setValue] = useState([])

  // console.log(value);

  // const handleKeyDown = event => {
  //   if (!inputValue) return
  //   switch (event.key) {
  //     case "Enter":
  //     case "Tab":
  //       setValue(prev => [...prev, createOption(inputValue)])
  //       setInputValue("")
  //       event.preventDefault()
  //   }
  // }



  const [dialog, setDialog] = useState(false);
  const [imgCrop, setImgCrop] = useState(false);
  const [storeImg, setStoreImg] = useState([]);

  const profileShow = storeImg.map(item => item.imgCrop);


  const onCrop = (view) => {
    setImgCrop(view)
  }

  const onClose = () => {
    setImgCrop(null)
  }

  const saveImage = async () => {

  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const id = localStorage.getItem('id');
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/profile/updateDisplayPicture/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         storeImg,
  //       }),
  //     });
  //     if (response.ok) {
  //       console.log('Profile image updated successfully');
  //       // You can update the user's profile image here if needed
  //       // Handle success here, e.g., update the profile image in your UI
  //     } else {
  //       console.error('Failed to update profile image');
  //       // Handle error here, e.g., display an error message to the user
  //     }

  //   } catch (error) {
  //     console.error('Network error:', error);
  //   }
  // };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  console.log(selectedFile);


  const handleImageUpload = async () => {
    if (!selectedFile) {
      toast.error("Select Image to Update")
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append('displayPicture', selectedFile);
      console.log(formData);


      try {
        const id = localStorage.getItem('id');

        const response = await axios.put(
          `${process.env.REACT_APP_SERVER_BASE_URL}/profile/updatedp/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
            },
          }
        );

        if (response.status === 200) {
          const responseData = response.data;
          // navigate('/')
          toast.success("Image Updated Successfully")
          navigate(0);
          window.scrollTo(0, 0);
          // navigate(0)

          // Handle success (e.g., update your UI to display the new image)
        } else {
          // Handle error (e.g., show an error message)
          console.error('Error uploading image:', response.statusText);

        }
      } catch (error) {
        // Handle the network error
        console.error('Error uploading image:', error);
      }
    }

  }

  const handleBackToHome = (e) => {
    e.preventDefault();
    navigate('/')
    window.scrollTo(0, 0);
  }





  return (

    <div className='change88'>

      <form className='form88'>
        <div className='change-up88'>
          <div className='change-image88'>
            <img src={gmi} alt='Your profile image' />
          </div>

          {/* <Dialog
            header={() => (
              <p className="header-dia88">
                Update Profile Image
              </p>)}

            visible={dialog}
            style={{ width: '30vw', backgroundColor: "white", border: "1px solid grey", borderRadius: "10px" }}
            onHide={() => setDialog(false)}>

            <div className='avatar88' style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", justifyContent: "flex-start", margin: "1rem" }}>
              <Avatar onClose={onClose} onCrop={onCrop} />

              <button onClick={saveImage} style={{ padding: "0.5rem 1.5rem", borderRadius: "5px", border: "none", backgroundColor: "#F58840", color: "white" }}>Save</button>
            </div>


          </Dialog> */}


          <div className='change-head88'>
            <p>Change Profile Picture</p>
            <div className='change-btn88'>
              <buton className="chng88 chng188" onClick={handleImageUpload} >Change</buton>
              <input type="file" onChange={handleFileChange} />
              {/* <buton className="chng88 chng288">Remove</buton> */}
            </div>
          </div>
        </div>





        <div className='change-down88'>

          <div className='form-left88'>

            <label htmlFor="fullname">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder='Enter your full name' onChange={profileHandler} value={profileData.firstName} />

            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" placeholder='dd/mm/yyyy' onChange={profileHandler} value={profileData.dateOfBirth} ></input>

            <label htmlFor="udid">UDID</label>
            <input type="text" id="udid" name="udid" placeholder='Enter your UDID' onChange={profileHandler} value={profileData.udid} ></input>

            <label htmlFor="assistiveDevice">Assistive Device</label>
            <select id="deassistiveDevice" name="assistiveDevice" value={profileData.assistiveDevice} onChange={profileHandler}  >
              <option value="wheel chairs">Wheel Chairs</option>
              <option value="tricycles">Tricycles</option>
              <option value="walking frames">Walking Frames</option>
              <option value="crutches">Crutches</option>
            </select>

            <label htmlFor="institution">Name of Institution</label>
            <input type="text" id="institution" name="institute" placeholder='Your Institution Name' onChange={profileHandler} value={profileData.institute} />

            <label htmlFor="skills">Skills</label>
            <input type="skills" id="skills" name="skills" placeholder='Enter your skills here. ' onChange={profileHandler} value={profileData.skills} />

            {/* <CreatableSelect components={components}
              inputValue={inputValue}
              isClearable
              isMulti
              menuIsOpen={false}
              onChange={newValue => setValue(newValue)}
              onInputChange={newValue => setInputValue(newValue)}
              onKeyDown={handleKeyDown}
              placeholder="Type something and press enter..."
              value={value}

              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#ede6e6',
                  border: "1px solid"

                }),
                multiValueLabel: (base) => ({
                  ...base,
                  backgroundColor: 'red',
                  color: 'white',
                }),
                container: (base) => ({
                  ...base,
                  backgroundColor: 'yello',
                  width: "250px",
                  padding: "3px",

                }),

              }}
            /> */}



          </div>

          <div className='form-right88'>
            <label htmlFor="fullname">Last Name</label>
            <input type="text" id="fullname" name="lastName" placeholder='Enter your full name' onChange={profileHandler} value={profileData.lastName} />

            <label htmlFor="phone">Mobile Number</label>
            <div className='mobilediv88'>
              <span className='telspan88'>+91</span>
              <input type="tel" id="phone" name="mobileNumber" onChange={profileHandler} value={profileData.mobileNumber} className='mobile88' ></input>


            </div>


            <label htmlFor="gender">Gender</label>
            <input type="text" id="gender" name="gender" placeholder='Your gender' onChange={profileHandler} value={profileData.gender} />

            <label htmlFor="disability">Disability</label>
            <select id="disability" name="disabilityType" value={profileData.disabilityType} onChange={profileHandler}>
              <option value="visual">Visual</option>
              <option value="hearing">Hearing</option>
              <option value="mobility">Mobility</option>
              <option value="cognitive">Cognitive</option>
              <option value="none">None</option>
            </select>

            <label htmlFor="education">Highest Level of Education</label>
            <input type="text" id="education" name="education" placeholder='Your education' onChange={profileHandler} value={profileData.education} />

          </div>

        </div>

        <div className='save88'>
          <button className='save-btn88 save-btn188' onClick={handleBackToHome}>Back to Home</button>
          <button className='save-btn88 save-btn288' onClick={handleSubmit}>Save Changes</button>
        </div>

      </form>
    </div>
  );
}

export default Change;
