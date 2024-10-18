<template>
  <div class="top-container" style="background-color: #e44063">
    <div style="text-align: center; justify-content: center; padding-top: 50px">
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
            <h1 class="my-4" style="margin-top: 20px; margin-bottom: 20px">
              Edit User
            </h1>
            <p style="font-size: 13px; margin-top: 10px">
              Edit user profile details
            </p>
          </div>
        </div>
        <div class="registration-form">
          <div class="col-md-6">
            <form @submit.prevent="updateUser">
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
                  <option value="" disabled selected>Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <select
                  id="role"
                  name="role"
                  v-model="role"
                  class="new-style"
                  style="width: 75%"
                  required
                >
                  <option value="" disabled selected>Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
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
                  readonly
                  title="read-only"
                />
              </div>
              <div
                v-if="imagePreview"
                class="text-center"
                style="margin-top: 20px"
              >
                <img
                  :src="imagePreview"
                  alt="Current Profile Image"
                  style="
                    max-width: 150px;
                    max-height: 150px;
                    border-radius: 50%;
                    margin-bottom: 10px;
                  "
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
                />
              </div>
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-primary w-50"
                  style="margin-bottom: 30px"
                >
                  Save Changes
                </button>
              </div>
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
  name: "EditUserView",
  data() {
    return {
      id: this.$route.query.id, 
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      gender: "",
      role: "",
      image: null,
      imagePreview: null,
      storedPassword: "",
    };
  },
  methods: {
    async fetchUserDetails() {
      try {
        const token = localStorage.getItem("jwt-token"); 
        console.log(token)
        const res = await axios.get(
      `http://localhost:8080/capstonecupid/user/read/${this.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
        const user = res.data;

        
        this.name = user.firstName;
        this.surname = user.lastName;
        this.username = user.userName;
        this.email = user.email;
        this.gender = user.gender;
        this.role = user.userRole;
        this.password = user.password;
        this.storedPassword = user.password;

        
        if (user.displayImage) {
          this.imagePreview = `data:image/jpeg;base64,${user.displayImage}`; 
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    },
    handleImageChange(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];

        
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result; 
        };
        reader.readAsDataURL(this.image); 
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
    async updateUser(event) {
      const confirmed = confirm(
        "Are you sure you want to update this user's information?"
      );

      if (!confirmed) {
        return;
      }

      let hexImage = null;
      if (this.image) {
        hexImage = await this.convertToBase64(this.image); 
      } else if (this.imagePreview) {
        
        hexImage = this.imagePreview.split(",")[1]; 
      }

      const updatedUserData = {
        id: this.$route.query.id,
        firstName: this.name,
        lastName: this.surname,
        userName: this.username,
        email: this.email,
        gender: this.gender,
        userRole: this.role,
        password: this.storedPassword,
        displayImage: hexImage, 
      };

      try {
        const token = localStorage.getItem("jwt-token");
        const res = await axios.post(
          "http://localhost:8080/capstonecupid/user/update",
          updatedUserData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("User updated:", res.data);
        alert("User successfully updated");
        this.$router.push({ name: "AdminView", query: { id: this.$route.query.adminId, userName: this.$route.query.adminUserName } });
      } catch (error) {
        console.error("Error updating user:", error);
        alert("An error occurred while updating the user.");
      }
    },
  },
  mounted() {
    this.fetchUserDetails(); 
  },
};
</script>

<style scoped>
.top-container {
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
