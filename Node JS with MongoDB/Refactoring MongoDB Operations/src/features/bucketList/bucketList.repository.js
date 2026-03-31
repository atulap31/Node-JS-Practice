// Please don't change the pre-written code
// Import the necessary modules here
import { getDB } from "../../config/mongodb.js";

class BucketListRepository {
  constructor() {
    this.collection = "bucketListItems";
  }
  async addBucketListItem(bucketListItem) {
    // Write your code here
    try{
      const db = getDB();
      const bucketCollection = db.collection(this.collection);

      await bucketCollection.insertOne(bucketListItem);
      return bucketListItem;
    }catch(err){
      console.log(err);
    }
  }

  async findOneBucketListItem(title) {
    // Write your code here
    try{
      const db = getDB();
      const bucketCollection = db.collection(this.collection);

      return await bucketCollection.findOne({title});
    }catch(err){
      console.log(err);
    }
  }
}

export default BucketListRepository;
