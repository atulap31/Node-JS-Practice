// Please don't change the pre-written code
// Import the necessary modules here

export default class ArtPiece {
  constructor(id, title, artist, year, imageUrl) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.imageUrl = imageUrl;
  }

  static db = [];

  static create({ title, artist, year, imageUrl }) {
    const artPiece = new ArtPiece(
      ArtPiece.db.length + 1,
      title,
      artist,
      year,
      imageUrl
    );
    ArtPiece.db.push(artPiece);
    return artPiece;
  }

  static findAll(query) {
    // Write your code here to retrieve all art pieces
    return this.db;
  }

  static findOne(id) {
    // Write your code here to retrieve a specific art piece by its id
    return this.db.find(artPiece => artPiece.id === parseInt(id));
  }

  static update(id, data) {
    // Write your code here to update the details of a specific art piece
    const artPieceIndex = this.db.findIndex(artPiece => artPiece.id === parseInt(id));
    
    if (artPieceIndex === -1) {
      return null;
    }
    
    // Update only the fields that are provided in the data object
    const updatedArtPiece = { ...this.db[artPieceIndex], ...data, id: parseInt(id) };
    this.db[artPieceIndex] = updatedArtPiece;
    
    return updatedArtPiece;
  }

  static delete(id) {
    // Write your code here to delete a specific art piece
    const artPieceIndex = this.db.findIndex(artPiece => artPiece.id === parseInt(id));
    
    if (artPieceIndex !== -1) {
      this.db.splice(artPieceIndex, 1);
      return true;
    }
    
    return false;
  }
}