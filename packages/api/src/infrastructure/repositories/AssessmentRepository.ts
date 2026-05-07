import { IAssessmentRepository } from '../../application/contracts';
import { Assessment as AssessmentType, CreateAssessmentDTO } from '../../types';
import { Assessment } from '../sequelize/models';

export class AssessmentRepository implements IAssessmentRepository {
  public async create(assessmentData: CreateAssessmentDTO): Promise<AssessmentType> {
    const assessment = await Assessment.create(assessmentData);
    return assessment.toJSON() as AssessmentType;
  }

  public async findAll(): Promise<AssessmentType[]> {
    const assessments = await Assessment.findAll({
      where: {
        deletedAt: null,
      },
    });
    return assessments.map((assessment) => assessment.toJSON() as AssessmentType);
  }

  public async delete(id: number): Promise<boolean> {
    const assessment = await Assessment.findByPk(id);

    if (!assessment) {
      throw new Error(`Assessment with id ${id} not found`);
    }

    await assessment.destroy();
    return true;
  }
}
