<!-- <template>
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
                  <li>
                    <h6 style="color: #fff; justify-content: center;">
                      Welcome:
                      <i>
                        <span
                          style="color: #000; margin-left: 10px;"
                          >{{ this.$route.query.userName }}</span
                        >
                      </i>
                    </h6>
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
            <h3 style="color: #fff;">User Profiles</h3>
            <span class="mu-header-dot" style="background-color: #fff"></span>
          </div>
  
          <div class="container col-md-12" style="margin-bottom: 30px;">
            
            <button @click="fetchMatches" class="btn btn-primary">
              Load Matches
            </button>
          </div>
  
          <div
            class="container col-md-12"
            style="margin-top: 50px; margin-bottom: 50px;"
          >
            
            <div
              v-for="user in users"
              :key="user.userId"
              class="profile-card"
              style="background-color: #fff"
            >

              <h3>{{ user.firstName }} {{ user.lastName }}</h3>
              <p>Gender: {{ user.gender }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "MatchView",
    data() {
      return {
        users: [],
      };
    },
  methods: {
  async fetchMatches() {
    try {
      
      const token = localStorage.getItem("jwt-token");
      
     
      if (!token) {
        throw new Error("No token found! Please log in.");
      }

      const res = await axios.get(
        "http://localhost:8080/capstonecupid/match/getall",
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );

      this.users = res.data; 
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login.");
      }
    }
  }
}
  };
  </script>
  
  <style scoped>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
    margin-top: 10px;
  }
  </style>
   -->
   <template>
    <div style="background-color: #e44063">
      <div id="mu-header" role="banner" style="padding-left: 15%; padding-right: 15%">
        <div>
          <nav class="navbar navbar-default mu-navbar">
            <div class="container-fluid">
              <div class="navbar-header">
                <h1>
                  <a class="navbar-brand" href="#" style="color: #fff">Cupid'sCorner</a>
                </h1>
              </div>
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav mu-menu navbar-right">
                  <li>
                    <h6 style="color: #fff; justify-content: center;">
                      Welcome:
                      <i>
                        <span style="color: #000; margin-left: 10px;">{{ currentUser }}</span>
                      </i>
                    </h6>
                  </li>
                  <li>
  <router-link 
    :to="{ path: '/user-profile', query: { user_id: user_id }}" 
    style="font-weight: bold">
    User Profile
  </router-link>
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
            <h3 style="color: #fff;">User Profiles</h3>
            <span class="mu-header-dot" style="background-color: #fff"></span>
          </div>
  
          <div class="container col-md-12" style="margin-bottom: 30px;">
            <button @click="fetchMatches" class="btn btn-primary">
              Load Matches
            </button>
          </div>
  
          <div class="container col-md-12" style="margin-top: 50px; margin-bottom: 50px;">
            <div
              v-for="match in filteredUsers"
              :key="match.userId"
              class="profile-card"
              style="background-color: #fff"
            >
              <h3>{{ match.firstName }} {{ match.lastName }}</h3>
              <p><strong>Username:</strong> {{ match.userName }}</p>
              <p><strong>Gender:</strong> {{ match.gender }}</p>
              <img
                v-if="match.displayImage"
                :src="`data:image/jpeg;base64,${match.displayImage}`"
                class="img-fluid"
                alt="User Display Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "MatchView",
    data() {
      return {
        users: [],
        currentUser: this.$route.query.userName || localStorage.getItem("loggedInUserName"),
        matchedUsers: [], 
        user_id: localStorage.getItem("loggedInUserid")
      };
    },
    computed: {
      filteredUsers() {
        return this.matchedUsers.filter(user => user.userName !== this.currentUser);
      },
    },
    methods: {
      async fetchMatches() {
        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) {
            throw new Error("No token found! Please log in.");
          }
  
          const res = await axios.get("http://localhost:8080/capstonecupid/match/getall", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          this.matchedUsers = res.data.filter(match => 
            match.user1Id.userName === this.currentUser || 
            match.user2Id.userName === this.currentUser
          ).map(match => 
            match.user1Id.userName === this.currentUser ? match.user2Id : match.user1Id
          );
  
          console.log(this.matchedUsers);
        } catch (error) {
          console.error("Error fetching users:", error);
          if (error.response && error.response.status === 401) {
            console.error("Unauthorized! Redirecting to login.");
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
    margin-top: 10px;
  }
  </style>
  