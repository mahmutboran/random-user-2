
import './App.css';
import axios from "axios"
import { ReactComponent as Cw } from "./assets/cw.svg"
import { ReactComponent as Design } from "./assets/design.svg"
import { ReactComponent as GrowingMan } from "./assets/growing-up-man.svg"
import { ReactComponent as GrowingWoman } from "./assets/growing-up-woman.svg"
import { ReactComponent as Mail } from "./assets/mail.svg"
import { ReactComponent as Man } from "./assets/man.svg"
import { ReactComponent as Woman } from "./assets/woman.svg"
import { ReactComponent as Map } from "./assets/map.svg"
import { ReactComponent as Padlock } from "./assets/padlock.svg"
import { ReactComponent as Phone } from "./assets/phone.svg"
import { useEffect, useState } from 'react';



function App() {

  const [data, setData] = useState([])

  const [addUser, setAddUser] = useState(false)

  const [table, setTable] = useState([])
console.log(table.length);
  const [icon, setIcon] = useState()

  const [iconName, setIconName] = useState()

  const fetchApi = async () => {

    await axios.get("https://randomuser.me/api/").then(res => setData(res.data.results[0]))

  }

  useEffect(() => {
    fetchApi()

    
  }, [])


  

  useEffect(() => {

    setIcon(`${data?.name?.first} ${data?.name?.last}`)
    setIconName("My name is")

  }, [data])


  const handleOver = (e) => {

    const hedef = e.target.closest("svg").className.baseVal

    if (hedef === "name border") {
      setIcon(`${data?.name?.first} ${data?.name?.last}`)
      setIconName("My name is")

    } else if (hedef === "mail border") {
      setIcon(data.email)
      setIconName("My mail is")
    } else if (hedef === "age border") {
      setIcon(data.registered.age)
      setIconName("My age is")
    } else if (hedef === "street border") {
      setIcon(`${data.location.street.name} ${data.location.street.number}`)
      setIconName("My street is")
    } else if (hedef === "phone border") {
      setIcon(data.phone)
      setIconName("My phone is")
    } else if (hedef === "password border") {
      setIcon(data.login.password)
      setIconName("My password is")
    }

  }

  const newUserClick = () => {
    fetchApi()
  }

  const addUserClick = () => {
    setAddUser(true)
    if (table.length===0) {
     setTable([...table, { name: `${data?.name?.first} ${data?.name?.last}`, email: data.email, phone: data.phone, age: data.dob.age }])
    }else{
      table[table.length-1].name!==`${data?.name?.first} ${data?.name?.last}` &&   setTable([...table, { name: `${data?.name?.first} ${data?.name?.last}`, email: data.email, phone: data.phone, age: data.dob.age }])
    }
  }

  return (
    <div className="App">
      <div className='front'>
        <Cw style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }} className="cw" />
        <div className="main" >
          <img src={data?.picture?.medium} alt="" />

          <div>
            <p>{iconName}</p>
            <p>{icon}</p>
          </div>

          <div className='icon'>

            {data?.gender === "male" ? <Man style={{ width: "3rem", height: "3rem", borderRadius: "3rem", cursor: "pointer" }} className="name border"
              onMouseOver={handleOver} />
              : <Woman style={{ width: "3rem", height: "3rem", borderRadius: "3rem", cursor: "pointer" }} className="name border"
                onMouseOver={handleOver} />}

            <Mail style={{ width: "3rem", height: "3rem", borderRadius: "3rem", cursor: "pointer" }} className="mail border" txt='mail'
              onMouseOver={handleOver} />

            {data?.gender === "male" ? <GrowingMan style={{ width: "3rem", height: "3rem", borderRadius: "3rem", cursor: "pointer" }}
              className="age border"
              onMouseOver={handleOver} />
              : <GrowingWoman style={{ width: "3rem", height: "3rem", borderRadius: "3rem", cursor: "pointer" }} className="age border"
                onMouseOver={handleOver} />}

            <Map style={{ width: "3rem", height: "3rem", borderRadius: "3rem", cursor: "pointer" }} className="street border"
              onMouseOver={handleOver} />

            <Phone style={{ width: "3rem", height: "3rem", borderRadius: "3rem", cursor: "pointer" }} className="phone border"
              onMouseOver={handleOver} />

            <Padlock style={{ width: "3rem", height: "3rem", borderRadius: "3rem", cursor: "pointer" }} className="password border"
              onMouseOver={handleOver} />
          </div>

          <div>
            <button onClick={newUserClick} >New User</button>
            <button onClick={addUserClick} >Add User</button>
          </div>

          {addUser && <div>
            <table className='table bg-warning '>
              <thead >
                <tr>

                  <th>Firstname</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody >
                {table.map((e, i) => (


                  <tr key={i} >
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.phone}</td>
                    <td>{e.age}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>}

        </div>
      </div>

      <footer>

         {"<boran/>"}
        <Design style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }} className="border" />
        <span>design</span>

      </footer>

    </div>
  );
}

export default App;
