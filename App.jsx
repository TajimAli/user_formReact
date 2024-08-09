import { useEffect, useState } from "react"
import data from './data.json'
import Table from "./dataTable"


const getlocalStorage = () => {
  let values = localStorage.getItem("jobApplication")
  if (values) {
    return (values = JSON.parse(localStorage.getItem("jobApplication")));
  } else {
    return [""];
  }
}
function App() {
  const [values, setValues] = useState(getlocalStorage, {
    fname: "", lname: "", email: "", number: "", gender: "", dob: "", country: "", state: "", city: "", coures: "",
    exHtmlcss: "", exJavaScript: "", exReact: "", exOther: "", companyn: "", resume: "", about: "",
  })

  useEffect(() => {
    localStorage.setItem("jobApplication", JSON.stringify(values));
  }, [values]);

  // localStorage.setItem('dataKey', JSON.stringify(data));

  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)

    const newErrors = validateError(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully!');
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  }


  const validateError = (data) => {
    const errors = {};

    if (!data.email) {
      errors.email = "email is required"
      // (!/\S+@\S+\.\S+/.test(data.email))
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email is not valid"
    }

    if (!data.number) {
      errors.number = "Number is required"
    } else if (data.number.length < 10 || data.number.length > 10) {
      errors.number = "Number Should be 10 Digits Long";
    }

    if (!data.fname) {
      errors.fname = "First Name is required"
    } else if (data.fname.length < 4) {
      errors.fname = 'Username must be at least 4 characters long';
    }

    return errors;
  }
  
  // if (values.number.length < 10 || values.number.length > 10) {
  //   errors.number = "Number Should be 10 Digits Long";
  // } else {
  //   errors.number = ""
  // }

  // if ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
  //   errors.email = "Enter valid email"

  // } else if ((/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
  //   errors.email = ""
  // }



  const [countries] = useState(data.countries);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, });

    const country = e.target.value;
    setSelectedCountry(country);
    setStates(countries.find(c => c.name === country).states);
    setCities([]);
    setSelectedState('');
  };

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, });

    const state = e.target.value;
    setSelectedState(state);
    setCities(states.find(s => s.name === state).cities);
  };

  return (
    <>
      <div className="container">
        <h1>Job Application</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fname">First Name:</label>
            <input type="name" name="fname" placeholder="Enter First Name" onChange={handleChange} />
            {errors.fname && (
              <span className="error-message">
                {errors.fname}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="lname">Last Name:</label>
            <input type="name" name="lname" placeholder="Enter Last Name" onChange={handleChange} />
            {errors.lname && (
              <span className="error-message">
                {errors.lname}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} />
            {errors.email && (
              <span className="error-message">
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="number">Contect Number:</label>
            <input type="number" name="number" placeholder="Enter Number" onChange={handleChange} />
            {errors.number && (
              <span className="error-message">
                {errors.number}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="gender">Select Gender</label>
            <input type="radio" name="gender" value="male" onChange={handleChange} /> Male:
            <input type="radio" name="gender" value="female" onChange={handleChange} /> Female:
            <input type="radio" name="gender" value="other" onChange={handleChange} /> Other:
          </div>

          <div>
            <label htmlFor="dob">Date Of Birth</label>
            <input type="date" name="dob" placeholder="Enter Birth Date" onChange={handleChange} />
            {errors.dob && (
              <span className="error-message">
                {errors.dob}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="location">What is Your Location.?</label>
            <div>
              <select name="country" value={selectedCountry} onChange={handleCountryChange}>
                <option value="" >--Select Country--</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>

            <div>
              <select name="state" value={selectedState} onChange={handleStateChange}>
                <option value="" >--Select State--</option>
                {states.map((state, index) => (
                  <option key={index} value={state.name}>{state.name}</option>
                ))}
              </select>
            </div>

            <div>
              <select name="city" onChange={handleChange}>
                <option value="">--Select city--</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="coures">Select Your Qualification:</label>
            <select name="coures" id="coures" onChange={handleChange}>
              <option value="coures">--Select Coures--</option>
              <option value="btech">B Tech</option>
              <option value="BCA">BCA</option>
              <option value="MBA">MBA</option>
              <option value="bcom">B Com</option>
            </select>
          </div>

          <div>
            <label htmlFor="exHtmlcss">Experience in HTML,CSS</label>
            <input type="exHtmlcss" name="exHtmlcss" placeholder="Experience in HTML,CSS" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="exJavaScript">Experience in JavaScript</label>
            <input type="exJavaScript" name="exJavaScript" placeholder="Experience in JavaScript" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="exReact">Experience in React</label>
            <input type="exReact" name="exReact" placeholder="Experience in React" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="exOther">Experience in Other Technolagy</label>
            <input type="exOther" name="exOther" placeholder="Experience in Other Technolagy" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="companyn">Company Name:</label>
            <input type="companyn" name="companyn" placeholder="Enter Company Name" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="resume">Uplode Resume</label>
            <input type="file" name="resume" placeholder="Uploade resume" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="about">Enter About Your Experience</label>
            <textarea name="about" onChange={handleChange}></textarea>
          </div>

          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Table/>
    </>
  )
}

export default App
