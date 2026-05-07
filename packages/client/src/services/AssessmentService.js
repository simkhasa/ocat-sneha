import { AssessmentRepository } from '../../infrastructure/repositories/index.js';

export const AssessmentService = {
  async create(data) {
    try {
      const result = await AssessmentRepository.create(data);
      return result;
    } catch (err) {
      console.error(`Error in AssessmentService.create:`, err);
      throw err;
    }
  },
};
