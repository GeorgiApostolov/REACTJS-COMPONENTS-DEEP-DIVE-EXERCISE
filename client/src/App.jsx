import { useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Pagination from "./components/Pagination.jsx";
import Search from "./components/Search.jsx";
import UserList from "./components/UserList.jsx";
import CreateUserModal from "./components/CreateUserModal.jsx";

function App() {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const addUserClickHandler = () => {
    console.log("test");
    setShowCreateUser(true);
  };
  const closeUserModalHandler = () => {
    setShowCreateUser(false);
  };
  const addUserSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const [country, city, street, streetNumber, ...userData] =
      Object.fromEntries(formData);
    userData.adress = {
      country,
      city,
      street,
      streetNumber,
    };

    userData.createAt = new Date().toISOString();
    userData.updatedAt = new Date().toISOString();
    console.log(userData);

    fetch("http://localhost:3030/jsonstore/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  return (
    <div>
      <Header />

      <main className="main">
        <section className="card users-container">
          <Search />

          {/* Table component */}
          <UserList />

          <button className="btn-add btn" onClick={addUserClickHandler}>
            Add new user
          </button>

          <Pagination />
        </section>

        {showCreateUser && (
          <CreateUserModal
            onClose={closeUserModalHandler}
            onSubmit={addUserSubmitHandler}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
