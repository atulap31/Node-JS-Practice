// Please don't change the pre-written code
// Import the necessary modules here

import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";

const collectionName = "students";

class studentRepository {
  async addStudent(studentData) {
    const db = getDB();
    await db.collection(collectionName).insertOne(studentData);
  }

  async getAllStudents() {
    const db = getDB();
    const students = await db.collection(collectionName).find({}).toArray();
    return students;
  }

  //You need to implement methods below:
  // Start Writing your code
  async createIndexes() {
    const db = getDB();
    const collection = db.collection(collectionName);
    
    // Create single-field index on 'name' field (ascending)
    await collection.createIndex({ name: 1 });
    console.log("Created index on 'name' field");
    
    // Create compound index on 'age' (ascending) and 'grade' (descending)
    await collection.createIndex({ age: 1, grade: -1 });
    console.log("Created compound index on 'age' and 'grade' fields");
  }

  async getStudentsWithAverageScore() {
    const db = getDB();
    const collection = db.collection(collectionName);
    
    const pipeline = [
      {
        $addFields: {
          averageScore: {
            $avg: "$assignments.score"
          }
        }
      },
      {
        $project: {
          name: 1,
          averageScore: { $round: ["$averageScore", 2] }, // Round to 2 decimal places
          _id: 0
        }
      }
    ];
    
    const result = await collection.aggregate(pipeline).toArray();
    return result;
  }

  async getQualifiedStudentsCount() {
    const db = getDB();
    const collection = db.collection(collectionName);
    
    const count = await collection.countDocuments({
      age: { $gt: 9 },
      grade: { $lte: 'B' },
      assignments: {
        $elemMatch: {
          title: 'math',
          score: { $gte: 60 }
        }
      }
    });
    
    return count;
  }

  async updateStudentGrade(studentId, assignmentTitle, extraCreditPoints) {
    const client = getClient();
    const session = client.startSession();
    
    try {
      let result = null;
      
      await session.withTransaction(async () => {
        const db = getDB();
        const collection = db.collection(collectionName);
        
        // Find the student first
        const student = await collection.findOne(
          { _id: new ObjectId(studentId) },
          { session }
        );
        
        if (!student) {
          throw new Error(`Student with ID ${studentId} not found`);
        }
        
        if (!student.assignments || student.assignments.length === 0) {
          throw new Error("Student has no assignments");
        }
        
        // Find the specific assignment and update its score
        const assignmentIndex = student.assignments.findIndex(
          (assignment) => assignment.title === assignmentTitle
        );
        
        if (assignmentIndex === -1) {
          throw new Error(`Assignment with title '${assignmentTitle}' not found`);
        }
        
        // Update the assignment score with extra credit
        const updatedAssignments = [...student.assignments];
        const oldScore = updatedAssignments[assignmentIndex].score;
        updatedAssignments[assignmentIndex].score = oldScore + extraCreditPoints;
        
        // Calculate new average score
        const totalScore = updatedAssignments.reduce((sum, assignment) => sum + assignment.score, 0);
        const averageScore = totalScore / updatedAssignments.length;
        
        // Determine new grade based on average score
        let newGrade;
        if (averageScore >= 90) {
          newGrade = 'A';
        } else if (averageScore >= 80) {
          newGrade = 'B';
        } else if (averageScore >= 70) {
          newGrade = 'C';
        } else if (averageScore >= 60) {
          newGrade = 'D';
        } else {
          newGrade = 'F';
        }
        
        console.log(`Updating student ${student.name}: Average score ${averageScore.toFixed(2)} -> Grade ${newGrade}`);
        
        // Update the student document atomically
        result = await collection.updateOne(
          { _id: new ObjectId(studentId) },
          {
            $set: {
              assignments: updatedAssignments,
              grade: newGrade
            }
          },
          { session }
        );
      });
      
      await session.endSession();
      return result;
      
    } catch (error) {
      await session.endSession();
      console.error("Transaction failed:", error.message);
      throw error;
    }
  }
}

export default studentRepository;