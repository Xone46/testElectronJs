<template>
  <div class="dashboard">
    <label>Creation un Post</label>
    <form class="row g-3 d-flex justify-content-center" @submit="onCreate">
      <div class="col-auto">
        <label for="staticEmail2" class="visually-hidden">Title</label>
        <input
          type="text"
          class="form-control"
          placeholder="Title"
          v-model="form.title"
        />
      </div>
      <div class="col-auto">
        <label for="staticEmail2" class="visually-hidden">Content</label>
        <textarea v-model="form.content" placeholder="add multiple lines"></textarea>
      </div>

      <div class="col-auto">
        <button style="margin: 5px" type="submit" class="btn btn-primary mb-3">
          Cree un post
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import posts from "../db/posts";
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
      },
      idCompte: "",
    };
  },

  created() {
    this.idCompte = sessionStorage.getItem("idCompte");
  },

  methods: {
    onCreate(evt) {
      evt.preventDefault();
      var doc = {
        _id: new Date().toISOString(),
        title: this.form.title,
        content: this.form.content,
        date : new Date(),
        id_compte : this.idCompte
      };
      //Inserting Document
      posts.put(doc, (err, response) => {
        if (err) {
          return console.log(err);
        } else {
          console.log("Document created Successfully" + response);
        }
      });
    }
    },

};
</script>

<style>
</style>