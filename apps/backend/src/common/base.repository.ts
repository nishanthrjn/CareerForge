// Generic BaseRepository<T> (Mongoose)
// Why generics here?
//BaseRepository<TDocument> lets us reuse the same CRUD helper logic for any Mongoose model,
// while preserving the specific document type (JobApplicationDocument, etc.).

// apps/backend/src/common/base.repository.ts
import { Model, FilterQuery, UpdateQuery } from "mongoose";

export class BaseRepository<TDocument extends Document> {
  constructor(protected readonly model: Model<TDocument>) { }

  async create(data: Partial<TDocument>): Promise<TDocument> {
    const created = new this.model(data);
    const saved = await created.save();
    // Explicit cast to satisfy TS
    return saved as TDocument;
  }

  async findById(id: string): Promise<TDocument | null> {
    return this.model.findById(id).exec();
  }

  async find(filter: FilterQuery<TDocument> = {}): Promise<TDocument[]> {
    return this.model.find(filter).exec();
  }

  async findAll(): Promise<TDocument[]> {
    return this.model.find().exec();
  }

          
  async deleteById(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: string,
    update: UpdateQuery<TDocument>
  ): Promise<TDocument | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }
}
