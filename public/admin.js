var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    selected:  "",
    addItem: null,
    photos: [
      {name: 'baseball', id: 1, path: './images/baseball.jpg'},
      {name: 'car', id: 2, path: './images/car.jpg'},
      {name: 'glasses', id: 3, path: './images/glasses.jpg'},
      {name: 'brush', id: 4, path: './images/brush.jpg'},
      {name: 'pen', id: 5, path: './images/pen.jpg'},
      {name: 'scissors', id: 6, path: './images/scissors.jpg'},
      {name: 'shovel', id: 7, path: './images/shovel.jpg'},
      {name: 'slinky', id: 8, path: './images/slinky.jpg'},
    ],
    items: [],
    findTitle: "",
    findItem: null,
    description: "",
  },
  methods: {
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async addNewItem(){
      try {
        let result = await axios.post('/api/items', {
          title: this.title,
          path: this.selected.path,
          description: this.description,
        });
        this.addItem = result.data;
      } catch (error) {
        console.log(error);
        console.log("Here is where I broke");
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        let response = await axios.delete("/api/items/" + item.id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
});