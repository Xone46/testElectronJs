<template>
  <div class="home">
    <label>Login</label>
    <form class="row g-3 d-flex justify-content-center" @submit="onLogin">
      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">Email</label>
        <input
          type="text"
          class="form-control"
          placeholder="Email"
          v-model="form.email"
        />
        <label for="inputPassword2" class="visually-hidden">Password</label>
        <input
          type="text"
          class="form-control"
          placeholder="Password"
          v-model="form.password"
        />
      </div>
      <div class="col-auto">
        <button style="margin: 5px" type="submit" class="btn btn-primary mb-3">
          Login
        </button>
      </div>
    </form>

    <label>Creation Compte</label>
    <form class="row g-3 d-flex justify-content-center" @submit="onCreate">
      <div class="col-auto">
        <label for="staticEmail2" class="visually-hidden">Email</label>
        <input
          type="text"
          class="form-control"
          placeholder="Email"
          v-model="form.email"
        />
      </div>
      <div class="col-auto">
        <label for="staticEmail2" class="visually-hidden">Nom</label>
        <input
          type="text"
          class="form-control"
          placeholder="nom"
          v-model="form.nom"
        />
      </div>
      <div class="col-auto">
        <label for="staticEmail2" class="visually-hidden">Prenom</label>
        <input
          type="text"
          class="form-control"
          placeholder="prenom"
          v-model="form.prenom"
        />
      </div>
      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Mot de passe"
          v-model="form.password"
        />
      </div>
      <div class="col-auto">
        <button style="margin: 5px" type="submit" class="btn btn-primary mb-3">
          Confirmer l'identité
        </button>
      </div>
    </form>

    <label>Voir Les Compte</label>
    <form class="row g-3 d-flex justify-content-center" @submit="onShowAll">
      <div class="col-auto">
        <button style="margin: 5px" type="submit" class="btn btn-primary mb-3">
          Voir Les Comptes
        </button>
      </div>
    </form>
    <ul id="example-1" v-if="flagUsers">
      <li v-for="user in arrayUsers" :key="user._rev">
        {{ user.nom }} - {{ user.prenom }} - {{ user.email }} -
        {{ user._rev }} - {{ user._id }}
      </li>
    </ul>

    <label>Voir un Compte</label>
    <form class="row g-3 d-flex justify-content-center" @submit="onShow">
      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">Id compte</label>
        <input
          type="text"
          class="form-control"
          placeholder="Id Compte"
          v-model="form.id"
        />
      </div>
      <div class="col-auto">
        <button style="margin: 5px" type="submit" class="btn btn-primary mb-3">
          Voir un Compte
        </button>
      </div>
    </form>

    <label>Supprimer un Compte</label>
    <form class="row g-3 d-flex justify-content-center" @submit="onDelete">
      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">_Rev</label>
        <input
          type="text"
          class="form-control"
          placeholder=" Svp entre _rev"
          v-model="form.rev"
        />
        <label for="inputPassword2" class="visually-hidden">Id</label>
        <input
          type="text"
          class="form-control"
          placeholder=" Svp entre ID"
          v-model="form.id"
        />
      </div>
      <div class="col-auto">
        <button style="margin: 5px" type="submit" class="btn btn-primary mb-3">
          Supprimer
        </button>
      </div>
    </form>

    <label>Modifier un Compte</label>
    <form class="row g-3 d-flex justify-content-center" @submit="onUpdate">
      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">nom</label>
        <input
          type="text"
          class="form-control"
          placeholder=" Svp entre Nom"
          v-model="form.nom"
        />
        <label for="inputPassword2" class="visually-hidden">prenom</label>
        <input
          type="text"
          class="form-control"
          placeholder=" Svp entre Prenom"
          v-model="form.prenom"
        />
        <label for="inputPassword2" class="visually-hidden">Email</label>
        <input
          type="text"
          class="form-control"
          placeholder=" Svp entre Email"
          v-model="form.email"
        />
        <label for="inputPassword2" class="visually-hidden">Mot de Pass</label>
        <input
          type="text"
          class="form-control"
          placeholder=" Svp entre Mot de Pass"
          v-model="form.password"
        />
        <label for="inputPassword2" class="visually-hidden">Id</label>
        <input
          type="text"
          class="form-control"
          placeholder=" Svp entre ID"
          v-model="form.id"
        />
        <label for="inputPassword2" class="visually-hidden">Rev</label>
        <input
          type="text"
          class="form-control"
          placeholder=" Svp entre Rev"
          v-model="form.rev"
        />
      </div>
      <div class="col-auto">
        <button style="margin: 5px" type="submit" class="btn btn-primary mb-3">
          Modifier
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>

<script>
import users from "../db/users";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
        nom: "",
        prenom: "",
        rev: "",
        id: "",
      },
      arrayUsers: [],
      flagUsers: false,
    };
  },
  methods: {
    onLogin(evt) {
      evt.preventDefault();
       const email = this.form.email
       const password = this.form.password
      //Retrieving all the documents in PouchDB
      users.allDocs({ include_docs: true }, (err, docs) => {
        if (err) {
          return console.log(err);
        } else {
       const isMatch = docs.rows.filter((val) => {
             return val.doc.email == email && val.doc.password == password;
          });
          
          if(isMatch) {
                 sessionStorage.setItem('idCompte', isMatch[0].doc._id);
                 this.$router.push('/dashboard')
                 
          }else {
             console.log('Compte N existe pas');
          }
        }
      });
    },
    onCreate(evt) {
      evt.preventDefault();
      //Preparing the document
      var doc = {
        _id: new Date().toISOString(),
        email: this.form.email,
        password: this.form.password,
        nom: this.form.nom,
        prenom: this.form.prenom,
      };
      //Inserting Document
      users.put(doc, (err, response) => {
        if (err) {
          return console.log(err);
        } else {
          console.log("Document created Successfully" + response);
        }
      });
    },

    onShowAll(evt) {
      evt.preventDefault();
      users.allDocs({ include_docs: true }, (err, docs) => {
        if (err) {
          return console.log(err);
        } else {
          this.flagUsers = true;
          docs.rows.map((val) => {
            this.arrayUsers.push(val.doc);
          });
        }
      });
    },
    onShow(evt) {
      evt.preventDefault();
      users.get(this.form.id, function (err, doc) {
        if (err) {
          return console.log(err);
        } else {
          console.log(doc);
        }
      });
    },
    onDelete(evt) {
      evt.preventDefault();
      users.remove(this.form.id, this.form.rev, function (err) {
        if (err) {
          return console.log(err);
        } else {
          console.log("Document deleted successfully");
        }
      });
    },

    onUpdate(evt) {
      evt.preventDefault();
      var doc = {
        nom: this.form.nom,
        prenom: this.form.prenom,
        password: this.form.password,
        email: this.form.email,
        _rev: this.form.rev,
        _id: this.form.id,
      };

      //Inserting Document
      users.put(doc);
    },
  },
};
</script>
