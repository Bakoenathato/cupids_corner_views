<template>
  <div class="top-container" style="background-color: #e44063">
    <div style="text-align: center; justify-content: center; padding-top: 60px">
      <h1>
        <router-link
          to="/"
          style="color: white"
          title="Click to navigate to landing page"
          >Cupid'sConer</router-link
        >
      </h1>
    </div>
    <div class="center-container">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="my-4" style="margin-top: 20px; margin-bottom: 30px">
              Login
            </h1>
            <p style="font-size: 13px; margin-top: 10px">
              Welcome back! Sign into your account below
            </p>
          </div>
        </div>
        <div class="login-form">
          <div>
            <form @submit.prevent="LoginData">
              <div>
                <input
                  type="email"
                  class="new-style"
                  v-model="user.email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  class="new-style"
                  v-model="user.password"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary w-50">
                  Login
                </button>
              </div>
              <p class="mt-3 text-center" style="font-size: 11px">
                Don't have an account?
                <router-link
                  to="/register"
                  style="color: blue; text-decoration: underline"
                  >Sign-Up</router-link
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
  name: "LoginView",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async LoginData() {
      try {
        const response = await axios.post(
          "http://localhost:8080/capstonecupid/user/login",
          this.user
        );
        console.log(response);
        const { data } = response;
        console.log(data);
        if (data.message === "Email not exists") {
          alert("Email does not exists");
        } else if (data.message === "Login Success") {
          alert("Login Success");
          const response = await axios.get(
            "http://localhost:8080/capstonecupid/user/getall"
          );
         
          const loggedInUser = response.data.find(u => u.email === this.user.email && u.password === this.user.password);
            
          this.$router.push({ name: "UserProfileView", query: { id: loggedInUser.id, userName: loggedInUser.userName } });
        } else {
          alert("Incorrect Email or Password not match");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Error, please try again");
      }
    },
  },
};
</script>

<style scoped>
.top-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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

.login-form {
  padding: 2rem;
  /* background-color: #ffffff;  */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
  /* height: 70vh; */
}

.login-form input {
  width: 50vh;
  padding: 0.75rem;
  border: 1px solid #d1d1d1;
  margin-bottom: 10px;
  /* background-color: #f9f9f9;  */
  /* color: #333;  */
  border-radius: 4px;
}

.login-form input::placeholder {
  color: #999;
}

.login-form button {
  width: 50%;
  padding: 0.75rem;
  background-color: #e44063;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;
  margin-bottom: 5px;
}

.login-form button:hover {
  background-color: #d92d55;
}

.new-style:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.new-style {
  transition: border-color 0.3s, box-shadow 0.3s;
}

.new-style {
  display: block;
  margin: 0 auto;
  /* width: 80%; */
}
</style>
