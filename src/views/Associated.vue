<template>
  <div class="associated">
    <form v-on:submit.prevent="findWords">
      <!-- Submit event handler to allow the findWords method to handle form submission. -->
      <p>
        Find words associated with
        <!-- <input type="text" v-model="rhyme" />  -->
        <!-- related to -->
        <input type="text" v-model="phrase" />
        <button type="submit">Search</button>
      </p>
    </form>
    <!-- v-if conditional to make this results list show only if there are results and if the length is greater than 0. -->
    <ul v-if="results && results.length > 0" class="results">
      <!-- v-for loop to the LI tag to loop through the items in the results. -->
      <li v-for="item of results" class="item" v-bind:key="item">
        <p>
          <strong>
            <!-- Output word -->
            {{ item.word }}
          </strong>
        </p>
        <p>
          <!-- Output score -->
          {{ item.score }}
        </p>
      </li>
    </ul>

    <!-- `v-else-if` conditional to make this message only show if there are no results returned (but we have actually attempted a request). -->
    <div v-else-if="results && results.length==0" class="no-results">
      <h2>No Words Found</h2>
      <p>Please adjust your search to find more words.</p>
    </div>

    <!-- v-if conditional to make this errors list show only if there are errors and if the length is greater than 0. -->
    <ul v-if="errors.length > 0" class="errors">
      <!-- v-for loop to the LI tag to loop through the errors. -->
      <li v-for="error of errors" v-bind:key="error">
        <!-- Output each error. -->
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script>
// Import axios
import axios from "axios";
export default {
  name: "Associated",
  data() {
    return {
      results: null,
      errors: [],
      phrase: ""
      // rhyme: ""
    };
  },
  // findWords method
  methods: {
    findWords: function() {
      axios
        .get("https://api.datamuse.com/words", {
          params: {
            rel_trg: this.phrase
            // rel_rhy: this.rhyme
          }
        })
        .then(response => {
          this.results = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });
    }
  }
  // The following inside of the findWords method:
  // An axios.get statement that requests from https://api.datamuse.com/words
  // The params object
  // Set the `ml` parameter equal to `this.phrase`
  // Set the `rel_ehy` parameter equal to `this.rhyme`
  // `then` clause
  // `then` clause, set `this.results` equal to `response.data`
  // `catch` clause
  // Inside the `catch` clause, push the new `error` onto the `this.errors` array
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.associated {
  font-size: 1.4rem;
}
input[type="text"] {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #333;
  width: 300px;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 300;
  background: rgba(0, 0, 0, 0.02);
  padding: 0.5rem;
}
button {
  background: #333;
  padding: 0.5rem;
  font-weight: 300;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
}
h1,
h2 {
  font-weight: normal;
}
ul.results {
  list-style-type: none;
  padding: 0;
}
.results li {
  display: inline-block;
  margin: 10px;
  border: solid 1px #333;
  padding: 0.5rem;
  width: 200px;
  min-height: 100px;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
}
ul.errors {
  list-style-type: none;
}
.errors li {
  border: 1px solid red;
  color: red;
  padding: 0.5rem;
  margin: 10px 0;
}
a {
  color: #42b983;
}
</style>