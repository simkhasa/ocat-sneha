import { inject, injectable } from 'inversify';
import { IUseCase } from 'src/types/shared';
import { Assessment, CreateAssessmentDTO } from 'src/types';
import { IAssessmentRepository } from '../../../contracts';

@injectable()
export class CreateAssessmentUseCase implements IUseCase<CreateAssessmentDTO, Assessment> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(assessmentData: CreateAssessmentDTO): Promise<Assessment> {
    this.validateScore(assessmentData.score);
    this.validateRiskLevel(assessmentData.score, assessmentData.riskLevel);

    return this.assessmentRepository.create(assessmentData);
  }

  private validateScore(score: number): void {
    if (typeof score !== `number`) {
      throw new Error(`Score must be a number`);
    }

    if (score < 0 || score > 5) {
      throw new Error(`Score must be between 0 and 5`);
    }
  }

  private validateRiskLevel(score: number, riskLevel: string): void {
    const expectedRiskLevel = this.calculateRiskLevel(score);

    if (riskLevel !== expectedRiskLevel) {
      throw new Error(
        `Risk level "${riskLevel}" does not match the score of ${score}. Expected "${expectedRiskLevel}".`,
      );
    }
  }

  private calculateRiskLevel(score: number): string {
    if (score >= 4) {
      return `Critical`;
    }

    if (score >= 3) {
      return `High`;
    }

    if (score >= 2) {
      return `Medium`;
    }

    return `Low`;
  }
}
