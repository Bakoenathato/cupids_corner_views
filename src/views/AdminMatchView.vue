<template>
    <div>
      <header id="mu-header" class="" role="banner">
        <div class="container">
          <nav class="navbar navbar-default mu-navbar">
            <div class="container-fluid">
              <!-- Brand and toggle get grouped for better mobile display -->
              <div class="navbar-header">
                <button
                  type="button"
                  class="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                  aria-expanded="false"
                >
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
  
                <!-- Text Logo -->
                <a class="navbar-brand" href="#" style="margin-top: 5px"
                  >Cupid'sConer</a
                >
  
                <!-- Image Logo -->
                <!-- <a class="navbar-brand" href="#"><img src="assets/images/logo.png"></a> -->
              </div>
  
              <!-- Collect the nav links, forms, and other content for toggling -->
              <div
                class="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul class="nav navbar-nav mu-menu navbar-right">
                  <li style="margin-top: 5px">
                    <router-link :to="{ path: '/dashboard', query: this.$route.query }" style="font-weight: bold"
                      >USERS</router-link
                    >
                  </li>
                  <li style="margin-top: 5px">
                    <router-link to="/Adminmatch" style="font-weight: bold"
                      >MATCHES</router-link
                    >
                  </li>
                  <li style="margin-top: 5px">
                    <router-link to="/admin-potential-match" style="font-weight: bold"
                      >POTENTIAL-MATCHES</router-link
                    >
                  </li>
                  <li
                    style="
                      margin-top: 10px;
                      margin-right: 20px;
                      margin-left: 60px;
                    "
                  >
                    <h6 style="color: #fff; display: inline">
                      Welcome:
                      <i
                        ><span style="color: #000; margin-left: 10px">{{
                          this.$route.query.userName
                        }}</span></i
                      >
                    </h6>
                  </li>
                  <li>
                    <form action="/logout" method="POST" style="display: inline">
                      <button
                        type="submit"
                        class="btn btn-primary navbar-btn"
                        style="margin-left: 15px"
                      >
                        Log Out
                      </button>
                    </form>
                  </li>
                </ul>
              </div>
              <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
          </nav>
        </div>
      </header>
      <div class="center-container">
        <div class="center-content">
          <div class="my-4" style="text-align: center; padding-top: 160px">
            <h3 style="color: #fff">User Profiles</h3>
            <span class="mu-header-dot" style="background-color: #fff"></span>
          </div>
          <div
            class="container col-md-12"
            style="
              margin-top: 30px;
              margin-bottom: 50px;
              padding-left: 100px;
              padding-right: 100px;
            "
          >
            <div class="header">
              <router-link to="/add-user" class="btn btn-primary w-50"
                >Add New User</router-link
              >
            </div>
            <table>
  <thead>
    <tr>
      <th>#</th>
      <th>Match ID</th>
      <th>User 1 Username</th>
      <th>User 1 Surname</th>
      <!-- <th>User 1 First Name</th> -->
      <th>User 1 Gender</th>
      <th>User 2 Username</th>
      <th>User 2 Surname</th>
      <!-- <th>User 2 First Name</th> -->
      <th>User 2 Gender</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(match, index) in matches" :key="match.matchId">
      <td>{{ index + 1 }}</td>
      <td>{{ match.matchId }}</td>
      <td>{{ match.user1Id.userName }}</td>
      <td>{{ match.user1Id.lastName }}</td>
      <!-- <td>{{ match.user1Id.firstName }}</td> -->
      <td>{{ match.user1Id.gender }}</td>
      <td>{{ match.user2Id.userName }}</td>
      <td>{{ match.user2Id.lastName }}</td>  
      <!-- <td>{{ match.user2Id.firstName }}</td> -->
      <td>{{ match.user2Id.gender }}</td>
      <td>
        <!-- <button
          @click="editMatch(match.matchId)"
          class="btn btn-primary navbar-btn"
        >
          Edit
        </button> -->
        <!-- <button
          @click="deleteMatch(match.matchId)"
          class="btn btn-danger navbar-btn"
          style="margin-left: 10px"
        >
          Delete
        </button> -->
      </td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminMatchView",
    data() {
      return {
        matches: [],
        adminId: this.$route.query.id,
        adminUserName: this.$route.query.userName,
      };
    },
    created() {
      this.fetchMatches();
    },
    // methods: {
    //   fetchUsers() {
    //     const token = localStorage.getItem("jwt-token");
    //     fetch("http://localhost:8080/capstonecupid/user/getall")
    //       .then((response) => response.json())
    //       .then((data) => {
    //         this.users = data;
    //       });
    //   },
    //   // editUser(id) {
    //   //   this.$router.push({ name: "EditUserView", query: { id , userName} });
    //   //   // this.$router.push({ name: "AdminView", query: { id: loggedInUser.id, userName: loggedInUser.userName } });
    //   // },
    //   editUser(id, adminId, adminUserName) {
    //     // Pass userId and userName in query params to EditUserView
    //     this.$router.push({
    //       name: "EditUserView",
    //       query: { id, adminId, adminUserName},
    //     });
    //   },
    //   deleteUser(id) {
    //     if (confirm("Are you sure you want to delete this user?")) {
    //       fetch(`http://localhost:8080/capstonecupid/user/delete/${id}`, {
    //         method: "DELETE",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       })
    //         .then((response) => {
    //           console.log("Response status:", response.status); // Log the status code
    //           console.log("Response OK:", response.ok); // Log the "ok" flag
  
    //           if (response.ok || response.status === 204) {
    //             alert("User deleted successfully");
    //             this.fetchUsers(); // Refresh user list after deletion
    //           } else {
    //             alert("Failed to delete user");
    //           }
    //         })
    //         .catch((error) => {
    //           console.error("Error deleting user:", error);
    //           alert("An error occurred while deleting the user.");
    //         });
    //     }
    //   },
    // },
    methods: {
        fetchMatches() {
      const token = localStorage.getItem("jwt-token"); 
      fetch("http://localhost:8080/capstonecupid/match/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
          this.matches = data;
        })
        .catch((error) => {
          console.error("Error fetching matches:", error);
          alert("An error occurred while fetching matches.");
        });
    },
  
    editMatch(id, adminId, adminUserName) {
     
      this.$router.push({
        name: "EditMatchView",
        query: { id, adminId, adminUserName },
      });
    },
  
//     deleteUser(id) {
//       const token = localStorage.getItem("jwt-token"); // Get the token from localStorage
  
//       if (confirm("Are you sure you want to delete this Match?")) {
//         fetch(`http://localhost:8080/capstonecupid/user/delete/${id}`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}` // Add the Authorization header
//           },
//         })
//           .then((response) => {
//             console.log("Response status:", response.status);
//             if (response.ok || response.status === 204) {
//               alert("User deleted successfully");
//               this.fetchUsers(); // Refresh user list after deletion
//             } else {
//               alert("Failed to delete user");
//             }
//           })
//           .catch((error) => {
//             console.error("Error deleting user:", error);
//             alert("An error occurred while deleting the user.");
//           });
//       }
//     },
//   }
}
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: grey;
  }
  
  .active {
    color: green;
  }
  
  .suspended {
    color: red;
  }
  
  .inactive {
    color: orange;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  button {
    /* margin: 0 5px; */
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
  