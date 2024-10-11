<template>
  <div class="top-container" style="background-color: #e44063">
    <div style="text-align: center; justify-content: center; padding-top: 50px;">
      <h1><router-link to="/"  style="color:white;" title="Click to navigate to landing page">Cupid'sConer</router-link></h1>
    </div>
    <div class="center-container">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="my-4" style="margin-top: 20px; margin-bottom: 20px">Register</h1>
            <p style="font-size: 13px; margin-top: 10px">
              Create a new account below
            </p>
          </div>
        </div>
        <div class="registration-form">
          <div class="col-md-6">
            <form @submit.prevent="createUser">
              <div>
                <input
                  type="text"
                  class="new-style"
                  v-model="name"
                  id="name"
                  placeholder="Name"
                  style="width: 75%"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  class="new-style"
                  v-model="surname"
                  id="surname"
                  placeholder="Surname"
                  style="width: 75%"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  class="new-style"
                  v-model="email"
                  id="email"
                  placeholder="E-mail"
                  style="width: 75%"
                  required
                />
              </div>
              <div>
                <select
                  id="gender"
                  name="gender"
                  v-model="gender"
                  class="new-style"
                  style="width: 75%"
                  required
                >
                  <option value="" disabled selected>Select an option</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  class="new-style"
                  v-model="username"
                  id="username"
                  placeholder="Username"
                  style="width: 75%"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  class="new-style"
                  v-model="password"
                  id="password"
                  placeholder="Password"
                  style="width: 75%"
                  required
                />
              </div>
              <div>
                <input
                  type="file"
                  id="displayImage"
                  name="displayImage"
                  @change="handleImageChange"
                  accept="image/*"
                  class="new-style-file"
                  style="width: 75%"
                  required
                />
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary w-50">
                  Register
                </button>
              </div>
              <p class="mt-3 text-center" style="font-size: 11px">
                Already have an account?
                <router-link
                  to="/login"
                  style="color: blue; text-decoration: underline"
                  >Login</router-link
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    return {
      users: [],
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      gender: "",
      image: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get(
          "http://localhost:8080/capstonecupid/user/getall"
        );
        this.users = res.data;
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    handleImageChange(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    },
    async createUser(event) {
      let hexImage = null;
      if (this.image) {
        hexImage = await this.convertToBase64(this.image);
      }

      const usersData = {
        firstName: this.name,
        lastName: this.surname,
        userName: this.username,
        email: this.email,
        password: this.password,
        gender: this.gender,
        displayImage: hexImage,
      };

      try {
        const res = await axios.post(
          "http://localhost:8080/capstonecupid/user/create",
          usersData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        this.users = res.data;
        console.log(res.data);
        console.log(usersData);
        alert("Registration successful!");
        this.$router.push({ name: "LoginView" });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Invalid Email");
        } else {
          console.error("Error creating user:", error);
          alert(
            "An error occurred during registration. Please try again later."
          );
        }
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>



.top-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100vh;  */

}
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #e44063;
  margin-bottom: 50px;
  margin-top: 50px;
}

.center-content {
  text-align: center;
}

.container {
  background-color: #fff;
  padding-top: 20px;
  width: 35%;
  border-radius: 25px;
}

.registration-form {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.col-md-6 {
  width: 100%;
  max-width: 600px;
}

.registration-form input,
.registration-form select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  margin-top: 10px;
}

.registration-form input::placeholder {
  color: #999;
}

.registration-form button {
  width: 60%;
  padding: 0.75rem;
  background-color: #e44063;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 50px;
}

.registration-form button:hover {
  background-color: #d92d55;
}

.new-style:focus,
.new-style-file:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.new-style,
.new-style-file {
  transition: border-color 0.3s, box-shadow 0.3s;
}

.new-style,
.new-style-file {
  display: block;
  margin: 0 auto;
  width: 75%;
}
</style>
