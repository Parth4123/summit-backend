// Import necessary modules
import { ObjectId } from "mongodb";
// Declare a variable to hold the database connection
let cluster0;


export default class summitDAO {
  // Method to inject the database connection
  static async InjectDB(conn) {
    // If the connection is already established, return
    if (cluster0) {
      return;
    }
    try {
      // Establish a connection to the database
      cluster0 = await conn.db("summit");
    } catch (e) {
      // Log any errors that occur during connection
      console.error(
        `Unable to establish a collection handle in summitDAO: ${e}`
      );
    }
  }

  async register(result) {
    try {
      // Insert the registration details into the database
      let sportsSelection = result.sportsConfirm

      const status = await cluster0.collection(`register_${sportsSelection}`).insertOne(result);
      if (status.insertedCount === 0) {
        throw new Error("Unable to register");
      }else{
        return { status: "success" };
      }
      } catch (e) {
      // Log any errors that occur during insertion
      console.error(`Unable to register: ${e}`);
      return { error: e };
    }
  }

  async getDetails(sports) {
    try {
      // Find the details of the sport
      const details = await cluster0.collection(`register_${sports}`).find().toArray();
      if (!details) {
        console.log("Unable to find details");
        return false
      }
      console.log(details)
      return details;
    } catch (e) {
      // Log any errors that occur during insertion
      console.error(`Unable to find details: ${e}`);
      return { error: e };
    }
  }

  async getAccommodation() {
      try {
        // Get all collection names
        const collectionNames = await cluster0.listCollections().toArray();

        // Initialize an array to store all teams that have said "Yes" for accommodation
        let allTeams = [];

        // Iterate over all collections and find teams that have said "Yes" for accommodation
        for (let collection of collectionNames) {
          const teams = await cluster0.collection(collection.name).find({ accommodation: "Yes" }, { projection: { _id: 0, collegeName: 1, sportsConfirm: 1 } }).toArray();          allTeams = allTeams.concat(teams);
        }

        if (!allTeams.length) {
          console.log("Unable to find teams");
          return false;
        }

        return allTeams;
      } catch (e) {
        // Log any errors that occur during fetching
        console.error(`Unable to find teams: ${e}`);
        return { error: e };
      }
  }
 
}
