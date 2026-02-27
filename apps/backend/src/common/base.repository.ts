// Generic BaseRepository<T> (Mongoose)
// Why generics here?
//BaseRepository<TDocument> lets us reuse the same CRUD helper logic for any Mongoose model,
// while preserving the specific document type (JobApplicationDocument, etc.).

// apps/backend/src/common/base.repository.ts
import { Model, FilterQuery, UpdateQuery, Document, QueryOptions } from "mongoose";

export class BaseRepository<TDocument extends Document, TId = string> {
  constructor(protected readonly model: Model<TDocument>) { }

  async create(data: Partial<TDocument>): Promise<TDocument> {
    const created = new this.model(data);
    const saved = await created.save();
    return saved as TDocument;
  }

  async findById(id: TId): Promise<TDocument | null> {
    return this.model.findById(id).exec();
  }

  async find(filter: FilterQuery<TDocument> = {}, options?: QueryOptions): Promise<TDocument[]> {
    return this.model.find(filter, null, options).exec();
  }

  async findPaginated(
    filter: FilterQuery<TDocument> = {},
    page: number = 1,
    limit: number = 10,
    options?: QueryOptions
  ): Promise<{ data: TDocument[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.find(filter, null, { ...options, skip, limit }).exec(),
      this.model.countDocuments(filter).exec()
    ]);
    return { data, total };
  }

  async findAll(): Promise<TDocument[]> {
    return this.model.find().exec();
  }

  async deleteById(id: TId): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: TId,
    update: UpdateQuery<TDocument>
  ): Promise<TDocument | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }
}
