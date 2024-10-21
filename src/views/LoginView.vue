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
            <form @submit.prevent="loginUser">
              <div>
                <input
                  type="text"
                  class="new-style"
                  v-model="user.userName"
                  id="exampleInputUserName1"
                  placeholder="User Name"
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
import AuthService from "@/AuthService";
import { jwtDecode } from "jwt-decode";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await AuthService.login(this.user);
        //console.log(response.data);

        const { data } = response;

        // if (data.token) {
        //   localStorage.setItem("jwtToken", data.token);
        // }

        // save the jwt token
        localStorage.setItem("jwt-token", data);
        localStorage.setItem("token-expiry", data.exp);
        // localStorage.setItem("user-Info", JSON.stringify({
        //   id: loggedInUser.id,
        //   userName: loggedInUser.userName
        // }));

        // use the jwt token to read the user logged in user
        const userData = await axios.get(
          "http://localhost:8080/capstonecupid/user/read",
          {
            headers: { Authorization: `Bearer ${data}` },
          }
        );

        const loggedInUser = userData.data;
        console.log(loggedInUser);

        if (loggedInUser) {
          // localStorage.setItem("user-role", loggedInUser.userRole);

          localStorage.setItem(
            "user-name", loggedInUser.userName
            // JSON.stringify({
            //   userName: loggedInUser.userName,
            // })
          );

          localStorage.setItem(
            "user-id", loggedInUser.id
            // JSON.stringify({
            //   id: loggedInUser.id,
            // })
          );

          localStorage.setItem(
            "user-role", loggedInUser.userRole
            // JSON.stringify({
            //   userRole: loggedInUser.userRole,
            // })
          );

          if (loggedInUser.userRole === "ADMIN") {
            alert("Admin Login Successful");
            this.$router.push({
              name: "AdminView",
              query: {
                id: loggedInUser.id,
                userName: loggedInUser.userName,
              },
            });
          } else {
            alert("User Login Successful");
            this.$router.push({
              name: "UserProfileView",
              query: {
                id: loggedInUser.id,
                userName: loggedInUser.userName,
              },
            });
            localStorage.setItem("loggedIn-userName", loggedInUser.userName);
            localStorage.setItem("loggedIn-userID", loggedInUser.id);
          }
        } else {
          alert("User not found in the system");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Error, please try again");
      }

      // try {
      //   AuthService.login(this.user).then((response) => {
      //     console.log(response.data);
      //   });
      // } catch (err) {
      //   console.error("Error:", err);
      //   alert("Error, please try again");
      // }
    },

    // async LoginData() {
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:8080/capstonecupid/user/login",
    //       this.user
    //     );
    //     const { data } = response;

    //     if (data.token) {
    //       localStorage.setItem("jwtToken", data.token);

    //       try {
    //         const userResponse = await axios.get(
    //           "http://localhost:8080/capstonecupid/user/getall",
    //           {
    //             headers: { Authorization: `Bearer ${data.token}` },
    //           }
    //         );

    //         const loggedInUser = userResponse.data.find(
    //           (u => u.userName === this.user.userName)
    //         );

    //         if (loggedInUser) {
    //           if (loggedInUser.userRole === "ADMIN") {
    //             alert("Admin Login Successful");
    //             this.$router.push({
    //               name: "AdminView",
    //               query: {
    //                 id: loggedInUser.id,
    //                 userName: loggedInUser.userName,
    //               },
    //             });
    //           } else {
    //             alert("User Login Successful");
    //             this.$router.push({
    //               name: "UserProfileView",
    //               query: {
    //                 id: loggedInUser.id,
    //                 userName: loggedInUser.userName,
    //               },
    //             });
    //           }
    //         } else {
    //           alert("User not found in the system");
    //         }
    //       } catch (error) {
    //         console.error("Error fetching user details:", error);
    //         alert("Error fetching user details. Please try again.");
    //       }
    //     } else {
    //       alert("Login failed. Please check your credentials.");
    //     }
    //   } catch (err) {
    //     console.error("Login Error:", err);
    //     if (err.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       alert(
    //         `Login failed: ${err.response.data.message || "Unknown error"}`
    //       );
    //     } else if (err.request) {
    //       // The request was made but no response was received
    //       alert("No response from server. Please try again later.");
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       alert("Error setting up the request. Please try again.");
    //     }
    //   }
    // },

    // aria-describedby="emailHelp"
    //   async LoginData() {
    //     try {
    //       const response = await axios.post(
    //         "http://localhost:8080/capstonecupid/user/login",
    //         this.user
    //       );
    //       // console.log(response);
    //       const { data } = response;

    //       if (data.token) {
    //         // store jwt token in the local storage
    //         localStorage.setItem("jwtToken", data.token);

    //         // check the user role and redirect them to their respective pages
    //         const userResponse = await axios.get("http://localhost:8080/capstonecupid/user/getall", {
    //           headers: {Authorization: `Bearer ${data.token}` }
    //         });

    //         const loggedInUser = userResponse.data.find(u => u.userName === this.userName);

    //         if (loggedInUser.userRole === "ADMIN") {
    //           alert("Admin Login Successful");
    //           this.$router.push( {name: "AdminView", query : {id: loggedInUser.id, userName: loggedInUser.userName} });
    //         } else {
    //           alert("User Login Successful");
    //           this.$router.push( {name: "UserProfileView", query : {id: loggedInUser.id, userName: loggedInUser.userName} });
    //         }
    //       } else {
    //         alert("Incorrect UserName or Password");
    //       }

    //       // console.log(data);
    //       // if (data.message === "User name not exists") {
    //       //   alert("Username does not exists");
    //       // } else if (data.message === "Login Success") {
    //       //   // const response = await axios.get(
    //       //   //   "http://localhost:8080/capstonecupid/user/getall"
    //       //   // );

    //       //   // const loggedInUser = response.data.find(u => u.userName === this.user.userName && u.password === this.user.password);
    //       //   // console.log(loggedInUser);

    //       //   if (loggedInUser.userRole === "ADMIN"){
    //       //     alert("Admin LogIn Successful");
    //       //     this.$router.push({ name: "AdminView", query: { id: loggedInUser.id, userName: loggedInUser.userName } });
    //       //   }
    //       //   else{
    //       //     alert("User LogIn Successful");
    //       //     this.$router.push({ name: "UserProfileView", query: { id: loggedInUser.id, userName: loggedInUser.userName } });
    //       //   }
    //       // } else {
    //       //   alert("Incorrect UserName or Password not match");
    //       // }
    //     } catch (err) {
    //       console.error("Error:", err);
    //       alert("Error, please try again");
    //     }
    //   },
    // },
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
