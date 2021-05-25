import "./App.css";
import cw from "./components/cw.svg";
import man from "./components/man.svg";
import woman from "./components/woman.svg";
import growingMan from "./components/growing-up-man.svg";
import growingWoman from "./components/growing-up-woman.svg";
import mail from "./components/mail.svg";
import map from "./components/map.svg";
import padlock from "./components/padlock.svg";
import phone from "./components/phone.svg";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [info, setInfo] = useState([]);
  const [personal, setPersonal] = useState("name");
  const [information, setInformation] = useState([]);
  const [userList, setuserList] = useState([]);

  const fetchData = () => {
    axios.get("https://randomuser.me/api/").then((res) => {
      console.log(res.data.results[0]);
      setInfo(res.data.results[0]);
      setInformation([
        res.data.results[0].name.title,
        res.data.results[0].name.first,
        res.data.results[0].name.last,
      ]);
      setPersonal("name");
    });
  };

  const handleClick = (information, personal) => {
    setInformation(information);
    setPersonal(personal);
  };

  const addUser = () => {
    if (userList.filter((user) => user.email === info?.email).length) {
      alert("Exist");
    } else {
      setuserList([
        ...userList,
        {
          name: info?.name?.first + " " + info?.name?.last,
          email: info.email,
          phone: info?.cell,
          age: info?.dob?.age,
        },
      ]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <img src={cw} alt="clarusway" className="cw" />
      <div className="card">
        <div className="card-title-background"></div>
        <img alt="img" src={info?.picture?.large} className="image" />
        <div className="personal-info">
          <p>My {personal} is </p>
          <p>
            {information.map((info, index) => (
              <span key={index}>{info + " "} </span>
            ))}
          </p>
        </div>
        <div className="icons">
          <acronym title="gender">
            <img
              src={info?.gender === "female" ? woman : man}
              alt="man-woman"
              onClick={() =>
                handleClick(
                  [info.name.title, info.name.first, info.name.last],
                  "name"
                )
              }
            />
          </acronym>
          <acronym title="mail">
            <img
              src={mail}
              alt="mail"
              onClick={() => handleClick([info?.email], "mail")}
            />
          </acronym>
          <acronym title="age">
            <img
              src={info?.gender === "female" ? growingWoman : growingMan}
              alt="growingWoman-growingMan"
              onClick={() => handleClick([info?.dob?.age], "age")}
            />
          </acronym>
          <acronym title="adress">
            <img
              src={map}
              alt="map"
              onClick={() =>
                handleClick(
                  [
                    info?.location?.street?.number,
                    info?.location?.street?.name,
                  ],
                  "adress"
                )
              }
            />
          </acronym>
          <acronym title="phone">
            <img
              src={phone}
              alt="phone"
              onClick={() => handleClick([info?.cell], "phone")}
            />
          </acronym>
          <acronym title="password">
            <img
              src={padlock}
              alt="password"
              onClick={() => handleClick([info?.login?.password], "password")}
            />
          </acronym>
        </div>
        <div className="buttons">
          <button onClick={fetchData}>NEW USER</button>
          <button onClick={addUser}>ADD USER</button>
        </div>
        <div className="list">
          {userList.length && (
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>E-mail</th>
                  <th>Phone</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {userList?.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
