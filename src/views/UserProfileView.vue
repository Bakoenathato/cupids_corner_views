<template>
  <div style="background-color: #e44063">
    <div
      id="mu-header"
      class=""
      role="banner"
      style="padding-left: 15%; padding-right: 15%"
    >
      <div>
        <nav class="navbar navbar-default mu-navbar">
          <div class="container-fluid">
            <div class="navbar-header">
              <h1>
                <a class="navbar-brand" href="#" style="color: #fff"
                  >Cupid'sCorner</a
                >
              </h1>
            </div>
            <div
              class="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul class="nav navbar-nav mu-menu navbar-right">
                <li style="margin-top: 10px; margin-right: 20px;"><h6 style="color: #fff; display: inline;">Welcome: <i><span style="color: #000; margin-left: 10px;">{{this.$route.query.userName}}</span></i></h6></li>
                <li><router-link to="/match" style="font-weight: bold">Matches</router-link></li>
                <li>
                  <form action="/logout" method="POST" style="display: inline;">
                    <button type="submit" class="btn btn-primary navbar-btn" style="margin-left: 15px;">
                      Log Out
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="center-container">
      <div class="center-content">
        <div class="my-4" style="text-align: center; padding-top: 200px">
          <h3 style="color: #fff;">
            User Profiles
          </h3>
          <span class="mu-header-dot" style="background-color: #fff"></span>
        </div>
        <div class="container col-md-12" style="margin-top: 50px; margin-bottom: 50px;">
          <div
            v-for="user in filteredUsers"
            :key="user.id"
            class="profile-card"
            style="background-color: #fff"
          >
            <img
              :src="`data:image/jpeg;base64,${user.displayImage}`"
              alt="User Image"
              class="img-fluid rounded-circle"
              height="500px"
              width="500px"
            />
            <h3>{{ user.firstName }} {{ user.lastName }}</h3>
            <p>{{ user.gender }}</p>
            <div class="button-group">
              <button @click="swipeLeft(user)" class="btn btn-danger">
                Swipe Left
              </button>
              <button @click="swipeRight(user)" class="btn btn-success">
                Swipe Right
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserProfileView",
  data() {
    return {
      users: [],
      filteredUsers: [],
      loggedInUser: null,
    };
  },
  created() {
    this.fetchUsers();
  },
  // methods: {
  //   // async fetchUsers() {
  //   //   try {
  //   //     const id = Number(this.$route.query.id);

  //   //     const response = await axios.get("http://localhost:8080/capstonecupid/user/getall");
  //   //     this.users = response.data;
  //   async fetchUsers() {
  // try {
  //   const id = Number(this.$route.query.id);
  //   const token = localStorage.getItem("jwt-token"); 
  //   const response = await axios.get("http://localhost:8080/capstonecupid/user/getall", {
  //     headers: {
  //       Authorization: `Bearer ${token}`, 
  //     },
  //   });
  //   this.users = response.data;

  //       this.loggedInUser = this.users.find(user => user.id === id);

  //       this.filteredUsers = this.users.filter(user => user.id !== this.loggedInUser.id && user.gender !== this.loggedInUser.gender);

  //     } catch (error) {
  //       console.error("Couldn't fetch users!", error);
  //     }
  //   },
  //   swipeLeft(user) {
  //     this.sendSwipeRequest(user, 'left');
  //   },
  //   swipeRight(user) {
  //     this.sendSwipeRequest(user, 'right');
  //   },
  //   sendSwipeRequest(user, direction) {
  //     const id = Number(this.$route.query.id);
  //   const token = localStorage.getItem("jwt-token");

  //     console.log('Swipe Data: ', {
  //       user1Id: this.loggedInUser.id,
  //       user2Id: user.id,
  //       direction: direction
  //     });

  //     axios
  //       .post('http://localhost:8080/capstonecupid/api/potential-match/process-swipe', {
  //         user1Id: this.loggedInUser.id,
  //         user2Id: user.id,
  //         direction: direction,
  //       }
  //     )
      
  //       .then(response => {
  //         if (response.data) {
  //           console.log(`Match created with user: ${user.id}`);
  //         } else {
  //           console.log(`Swiped ${direction} on user: ${user.id}`);
  //         }
  //         // remove the swiped user from the list
  //         this.users = this.users.filter(user => user.id !== user.id);
  //       })
  //       .catch(error => {
  //         console.error(`There was an error swiping ${direction}!`, error)
  //       });
  //   }
  // }
  methods: {
  async fetchUsers() {
    try {
      const id = Number(this.$route.query.id || localStorage.getItem("loggedInUserid"));
      const token = localStorage.getItem("jwt-token"); 
      const response = await axios.get("http://localhost:8080/capstonecupid/user/getall", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      this.users = response.data;

      this.loggedInUser = this.users.find(user => user.id === id);
      this.filteredUsers = this.users.filter(user => user.id !== this.loggedInUser.id && user.gender !== this.loggedInUser.gender && user.userRole !== 'ADMIN');

    } catch (error) {
      console.error("Couldn't fetch users!", error);
    }
  },
  swipeLeft(user) {
    this.sendSwipeRequest(user, 'left');
  },
  swipeRight(user) {
    this.sendSwipeRequest(user, 'right');
  },
  sendSwipeRequest(user, direction) {
    const id = Number(this.$route.query.id);
    const token = localStorage.getItem("jwt-token");

    console.log('Swipe Data: ', {
      user1Id: this.loggedInUser.id,
      user2Id: user.id,
      direction: direction
    });

    axios
      .post('http://localhost:8080/capstonecupid/api/potential-match/process-swipe', {
        user1Id: this.loggedInUser.id,
        user2Id: user.id,
        direction: direction,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then(response => {
        if (response.data) {
          console.log(`Match created with user: ${user.id}`);
        } else {
          console.log(`Swiped ${direction} on user: ${user.id}`);
        }
        this.users = this.users.filter(u => u.id !== user.id);
      })
      .catch(error => {
        console.error(`There was an error swiping ${direction}!`, error);
      });
  }
}
};
</script>

<style scoped>

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
}

.center-content {
  text-align: center;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.profile-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  text-align: center;
  width: 300px;
}
.img-fluid {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.button-group {
  display: flex;
  justify-content: space-around;
}
</style>
